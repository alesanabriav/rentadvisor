<?php
$dir_base =  str_replace('apis', '', __DIR__);

if( file_exists($dir_base . '/vendor/autoload.php') ) {

require $dir_base . 'vendor/autoload.php';

 function mc_subscribe($data, $listId, $apiKey) {
    $options = array(
      'auth' => array('user', $apiKey)
    );
		
    $datacenter =  explode("-", $apiKey)[1];
    $headers = array('Accept' => 'application/json', 'content-type' => 'application/json');
    $urlBase = 'http://'. $datacenter .'.api.mailchimp.com/3.0/';
    $req = Requests::post($urlBase . 'lists/' . $listId . '/members', $headers, $data, $options);
    return $req->body;
  }

}