<?php
echo " <META HTTP-EQUIV=\"Refresh\" content=\"10\">\n";
/**
 * API请求DEMO
 * 
 * 本demo支持GET与POST请求，同时支持签名验证与无需签名。
 */

//你申请的key密钥
$API_KEY = 'D9vp6AMs4j3o4zjGCx6Hvxxfg9';

//API接口地址
$API_URL = 'http://apii.lolimi.cn/api/randtext/get';

$get_post_data = array(
    //接口参数，一行一个，可按照接口文档-请求参数 的参数填写，或者直接复制开发工具下面的测试代码。
    'key' => $API_KEY,
);

//签名校验的 SK：(在用户控制台http://apii.lolimi.cn/user/key的秘钥安全设置->签名校验 开启后才会生效，没开启签名校验留空即可。)
$sk = '26df826111a48e40984d6a03b7cc764c';

/*发起请求API接口:
第1个参数：API接口地址URL，跟上面的同名变量相对应，无需更改。
第2个参数：API接口参数数组，跟上面的同名变量相对应，无需更改。
第3个参数：请求协议（GET或POST），一般默认GET，部分接口需要POST请求，根据实际情况修改为POST即可。
第4个参数：是否验证签名，true验证签名，否则false不验证签名，根据用户控制台 http://apii.lolimi.cn/user/key 的 秘钥安全设置->签名校验 开启后才会生效，如没开启，填写false即可。
第5个参数：如果第4个参数开启验证签名，此处必须填写 SK ，跟上面的同名变量相对应，无需更改。
 */
$resdata = api::send($API_URL, $get_post_data, 'GET', true, $sk);  //发起请求，注意这里要选择接口支持的协议，默认GET，可选POST

//打印请求结果
print($resdata);
///////////////你的业务代码可写在这里处理API返回的数据

/**
 * API请求类
 */
class api
{
    public static function send($API_URL, $get_post_data, $type, $ifsign, $sk)
    {
        $get_post_data = http_build_query($get_post_data);
        if ($ifsign) {
            $sign = md5($get_post_data . $sk);
            $res = self::send_curl($API_URL, $type, $get_post_data, $sign);
        } else {
            $res = self::send_curl($API_URL, $type, $get_post_data, null);
        }
        return $res;
    }
    //封装好的CURL请求函数,支持POST|GET
    public static function send_curl($API_URL, $type, $get_post_data, $sign)
    {
        $ch = curl_init();
        if ($type == 'POST') {
            curl_setopt($ch, CURLOPT_URL, $API_URL);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $get_post_data);
        } elseif ($type == 'GET') {
            curl_setopt($ch, CURLOPT_URL, $API_URL . '?' . $get_post_data);
        }
        if ($sign) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['sign:' . $sign]);
        }
        curl_setopt($ch, CURLOPT_REFERER, $API_URL);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $resdata = curl_exec($ch);
        curl_close($ch);
        return $resdata;

    }
}




