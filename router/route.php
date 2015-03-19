<?php
/**
 * Created by PhpStorm.
 * User: cara
 * Date: 2015/1/19
 * Time: 下午 2:29
 */
require_once("vendor/autoload.php");

use Pux\Mux;

$mux = new Mux;

$mux->any('/', ['Mvc\Controller\Controller', 'run']);
//*plan建立
$mux->post('/plan/new', ['Mvc\Controller\Controller', 'newPlan']);
//*plan修改
$mux->post('/plan/edit', ['Mvc\Controller\Controller', 'editPlan']);
//*plan刪除
$mux->post('/plan/del', ['Mvc\Controller\Controller', 'delPlan']);
//*plan明細
$mux->get('/plan/lists', ['Mvc\Controller\Controller', 'listsPlan']);
//*plan單一明細
$mux->get('/plan/uniqueLists', ['Mvc\Controller\Controller', 'uniqueListsPlan']);
//*plan建立檢查
$mux->post('/plan/insertCheck', ['Mvc\Controller\Controller', 'insertPlanCheck']);

//*item建立
$mux->post('/planItem/new', ['Mvc\Controller\ListController', 'newItem']);
//*item瀏覽
$mux->get('/planItem/lists', ['Mvc\Controller\ListController', 'listsItem']);

return $mux;
