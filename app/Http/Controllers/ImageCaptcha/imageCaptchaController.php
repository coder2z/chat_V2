<?php

namespace App\Http\Controllers\ImageCaptcha;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class imageCaptchaController extends Controller
{
    //
    public function captcha()
    {
        $captcha['url'] = captcha_src();
        return ($captcha);
    }
}
