<?php

namespace App\Http\Controllers\Robot;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\RobotChatModel;
use App\Models\RobotChatExtraModel;
use App\Models\Company;
use App\Models\User;
use App\Models\Blacklist;
use Illuminate\Support\Facades\Auth;



class RobotChatController extends Controller
{

  public function getQuestionId(Request $request){
      // dd(Auth::check());
      $startSplitNum = 2;//第一次分割几个
      $question = ($request->input('text'));
      $questionLength = strlen($question)/3;//中文字符占三个
      $relationRatio = 0;
      $relationRatioExtra = 2;
      $fieldValue = 'id';//表中id字段名
      $allAnswerIds = [];
      $defaultAnswer['answer'] = "对不起，臣妾不知道呢。";
      $defaultKefu = "人工客服";//匹配对话
      $defaultkefuCode = 201;//返回code
      $defaultWebSocketSite['site'] = "ws://xxxx.xxxx.xxxx";//ws地址
      $defaultQuestion = 'defaultQuestion';//表中默认不知道的回复的问题；
      $companyUrl = $request->companyUrl;
      $companyUrl = substr($companyUrl,1);
      $companyId = null;
      try {
        $companyId = (new Company())->where('url',$companyUrl)->first()->chat_user_id;
      } catch (\Exception $e) {
        return response()->success(100,'未找到该公司',null);
      }
      //查找出一个默认回复
      $defaultAnswerArray = (new RobotChatModel())->select('answer')->where('question',$defaultQuestion)->get();//拿出所有默认不知道的回复
      if(count($defaultAnswerArray)>0){
        $defaultAnswer = $defaultAnswerArray[rand(0, count($defaultAnswerArray)-1)];//随机选出一个
      }
      //判断是否满足回答（切割）条件
      if($questionLength < $startSplitNum){//字数小于切割字数的回答
        return response()->success(200,'成功！',$defaultAnswer);
      }
   	  //判断是否是找寻人工客服
      if($question == $defaultKefu){
        if(!Auth::check()){
          return response()->fail(202,'未登录','../login?companyUrl='.$request->get('companyUrl'));
        }
        if(!User::where("type",$companyId)->first()){
          $noCutomer['answer'] = '该公司还没有客服!';
          return response()->fail(200,'该公司还没有客服!',$noCutomer);
        }
        if(Blacklist::where(['company_id'=>$companyId,'person_id'=>Auth::user()->id,'state'=>'0'])->first()){
          $inBlack['answer'] = '您在公司黑名单中!';
          return response()->fail(200,'您在公司黑名单中!',$inBlack);
        }
        return response()->success($defaultkefuCode,'成功！',$defaultWebSocketSite);
      }






      //查找可能问答表
      //在表中查找答案并给出权重值
      for($i = $startSplitNum; $i<= $questionLength;$i+=1){//循环每次切割的数量
          $tempLists = $this->preSplit($question,$i);//临时存储切割后的词组
          foreach ($tempLists as $key => $tempStr) {//将词组拿出在数据库进行匹配
            try{
                $dbData =(new RobotChatExtraModel())->select($fieldValue)->where('title','like','%'.$tempStr.'%')->get()->toarray();
            }catch(\Exception $e){
                return response()->success(200,'成功！',$defaultAnswer);
            }finally{

            }
            foreach ($dbData as $key => $oneData) {//将得到的id array遍历出来并存储到$allAnswerIds
              for($ratio = 0; $ratio <= $startSplitNum * $relationRatio;$ratio+=1){//如果到后面匹配合适的多，就看是否乘以系数
                $allAnswerIds[] = $oneData[$fieldValue];
              }
            }
          }
      }

      $maybeAnswerUndefined = $this->findSomeAnswer($allAnswerIds,$relationRatioExtra);//设置偏移量
      // dd($maybeAnswer);
      $answerList = [];
      $questionList = [];
      $answerRight = null;
      $answerRightUrl = null;
      $flage = true;
      if(!is_array($maybeAnswerUndefined)){
        $maybeAnswer = [$maybeAnswerUndefined];
      }else{
        $maybeAnswer = $maybeAnswerUndefined;
      }
      // dd($maybeAnswer);
      try{
        foreach ($maybeAnswer as $key => $value) {
          $temp = (new RobotChatExtraModel())->select()->where([$fieldValue=>$value,'company_id'=>$companyId,'state'=>'2'])->first();
          if(!$temp) continue;
          if($flage){
            $answerRight = $temp->title;
            $answerRightUrl = $request->server('HTTP_HOST').'/articles/'.$temp->id;
            $flage = false;
            continue;
          }
          $answerList[] = $request->server('HTTP_HOST').'/articles/'.$temp->id;
          $questionList[] = $temp->title;
        }
      }catch(\Exception $e){
          return response()->success(200,'成功！',$defaultAnswer);
      }finally{

      }
      // if(!$answerRight){//未找到答案回答
      //   return response()->success(200,'成功！',$defaultAnswer);
      // }
      //找到一个答案
      // if(count($answerList) == 0 && $answerRight){
      //   $formatList['answer']=$answerRight;
      //   $formatList['answerRightUrl'] = $answerRightUrl;
      //   return response()->success(200,'成功！',$formatList);
      // }
      // $returnList['maybeQuesion'] = $questionList;
      // $returnList['answer'] = $answerRight;
      // $returnList['answerList'] = $answerList;
      // $returnList['answerRightUrl'] = $answerRightUrl;
      // return response()->success(200,'成功！',$returnList);
        
        
       
      if($answerRight){//找到答案回答
        // 找到一个答案
        if(count($answerList) == 0 && $answerRight){
          $formatList['answer']=$answerRight;
          $formatList['answerRightUrl'] = $answerRightUrl;
          return response()->success(200,'成功！',$formatList);
        }
        $returnList['maybeQuesion'] = $questionList;
        $returnList['answer'] = $answerRight;
        $returnList['answerList'] = $answerList;
        $returnList['answerRightUrl'] = $answerRightUrl;
        return response()->success(200,'成功！',$returnList);
        return response()->success(200,'成功！',$defaultAnswer);
      }
      











      //查找问答表
      //在表中查找答案并给出权重值
      for($i = $startSplitNum; $i<= $questionLength;$i+=1){//循环每次切割的数量
          $tempLists = $this->preSplit($question,$i);//临时存储切割后的词组
          foreach ($tempLists as $key => $tempStr) {//将词组拿出在数据库进行匹配
            try{
                $dbData =(new RobotChatModel())->select($fieldValue)->where('question','like','%'.$tempStr.'%')->get()->toarray();
            }catch(\Exception $e){
                return response()->success(200,'成功！',$defaultAnswer);
            }finally{

            }
            foreach ($dbData as $key => $oneData) {//将得到的id array遍历出来并存储到$allAnswerIds
              for($ratio = 0; $ratio <= $startSplitNum * $relationRatio;$ratio+=1){//如果到后面匹配合适的多，就看是否乘以系数
                $allAnswerIds[] = $oneData[$fieldValue];
              }
            }
          }
      }


      $maxId = $this->findHotestId($allAnswerIds);
      try{
        $answer =(new RobotChatModel())->select('answer')->where($fieldValue,$maxId)->first();
      }catch(\Exception $e){
          return response()->success(200,'成功！',$defaultAnswer);
      }finally{

      }
      if(!$answer){//未找到答案回答
        return response()->success(200,'成功！',$defaultAnswer);
      }
      return response()->success(200,'成功！',$answer);
  }
  //从查找出来的问题array中找出出现次数最多的
    public function findHotestId($allNum){
        $tempArray = [];
        $array = array_count_values($allNum);
        arsort($array); // 按照键值对关联数组进行降序排序
        $first = reset($array);
        $first_key = key($array);
        $tempArray[] = $first_key;
        $next = next($array);
        if($next == null){
            return $first_key;
        }
        while($first == $next){
            $tempArray[] = key($array);
            $next = next($array);
        }
        return $tempArray[rand(0, count($tempArray)-1)];
    }
    //分割汉字
  public function preSplit(String $str, Int $num){
      $qiegehanzishu = $num;
      $questionLength = strlen($str);
      $index = 0;
      $dijin = 3;
      $splitLength = $qiegehanzishu * 3;
      $psList = [];
      for($index;$index+$splitLength<=$questionLength;$index+=$dijin){
          $psList[] = substr($str,$index,$splitLength);
      }
      return $psList;
  }

  //获取可能回答问题id 返回array
  public function findSomeAnswer($allNum,$relationRatioExtra){
    $tempArray = [];
    $array = array_count_values($allNum);
    arsort($array); // 按照键值对关联数组进行降序排序
    $first = reset($array);
    $first_key = key($array);
    $tempArray[] = $first_key;
    $next = next($array);
    if($next == null){
        return $first_key;
    }
    while($first == $next){
        $tempArray[] = key($array);
        $next = next($array);
    }
    return $tempArray;
  }
}
