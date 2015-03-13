<?php
namespace Mvc\Controller;
use Mvc\Controller\Controller;
use Mvc\Model\ListModel;
use Mvc\View\View;

class ListController
{
    // 共用的物件
    private $ListModel = NULL;
    private $getPost = NULL;
    // 使用者選擇的動作
    private $action = 'newItem';
    // 建構函式
    // 初始化要執行的動作以及物件
    public function __construct()
    {
        $this->ListModel = new ListModel();
        $this->Controller = new Controller();
        $this->getPost = $this->getPost();
    }

    public final function run()
    {
        $this->{$this->action}();
        $this->listsItem();
    }
    //*取得itemPOST值
    public function getPost()
    {
        foreach ($_POST as $key => $value)
        {
            $_POST[$key] = trim($value);
        }
        $itemData = array();
        if (isset($_POST['id'])) {
            $itemData['id'] = $_POST['id'];
        }
        if (isset($_POST['planPlaceId'])) {
            $itemData['planPlaceId'] = $_POST['planPlaceId'];
        }
        if (isset($_POST['planId'])) {
            $itemData['planId'] = $_POST['planId'];
        }

        if (isset($_POST['category'])) {
            $itemData['category'] = $_POST['category'];
        }
        if (isset($_POST['startTime'])) {
            $itemData['startTime'] = $_POST['startTime'];
        }
        if (isset($_POST['endTime'])) {
            $itemData['endTime'] = $_POST['endTime'];
        }
        if (isset($_POST['description'])) {
            $itemData['description'] = $_POST['description'];
        }
        if (isset($_POST['defaultCost'])) {
            $itemData['defaultCost'] = $_POST['defaultCost'];
        }
        if (isset($_POST['cost'])) {
            $itemData['cost'] = $_POST['cost'];
        }
        if (isset($_POST['createOn'])) {
            $itemData['createOn'] = $_POST['createOn'];
        }
        if (isset($_POST['modifyOn'])) {
            $itemData['modifyOn'] = $_POST['modifyOn'];
        }
        return $itemData;
    }
    //*建立檢查
    public function insertItemCheck()
    {
        $status = $this->ListModel->insertItemCheck($this->getPost['id']);
        if ($status == 'success') {
            return View::render(array('status' => false));
        }else {
            return View::render(array('status' => 'success'));
        }
    }
    //*建立item資料
    public function newItem()
    {
        $status = $this->ListModel->newItem($this->getPost);
        return View::render(array('status' => $status));
    }
    //*修改item資料
    public function editItem()
    {
        $status = $this->ListModel->editItem($this->getPost);
        if ($status == "成功") {
            return View::render(array('status' => $status));
        }else {
            return View::render(array('status' => false));
        }
    }
    //*刪除item資料
    public function delItem()
    {
        $status = $this->ListModel->delItem($this->getPost);
        if ($status == "成功") {
            return View::render(array('status' => "success"));
        }else {
            return View::render(array('status' => false));
        }
    }
    //*itemList明細
    public function listsItem()
    {
        $status = $this->ListModel->listsItem($this->getPost);
        if ($status == false) {
            return View::render(array('status' => $status));
        }else {
            return View::render(array('status' => $status));
        }
    }
}