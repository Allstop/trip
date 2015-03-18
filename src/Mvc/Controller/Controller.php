<?php
namespace Mvc\Controller;

use Mvc\Model\Model;
use Mvc\View\View;

class Controller
{
    // 共用的物件
    private $Model = NULL;
    private $gtPost = NULL;
    // 使用者選擇的動作
    private $action = 'newPlan';
    // 建構函式
    // 初始化要執行的動作以及物件
    public function __construct()
    {
        $this->Model = new Model();
        $this->gtPost = $this->getPost();
    }

    public final function run()
    {
        $this->{$this->action}();
        $this->listsPlan();

    }
    //*取得planPOST值
    public function getPost()
    {
        foreach ($_POST as $key => $value)
        {
            $_POST[$key] = trim($value);
        }
        $tripData = array();
        if (isset($_POST['id'])) {
            $tripData['id'] = $_POST['id'];
        }

        if (isset($_POST['title'])) {
            $tripData['title'] = $_POST['title'];
        }
        if (isset($_POST['introduction'])) {
            $tripData['introduction'] = $_POST['introduction'];
        }
        if (isset($_POST['nop'])) {
            $tripData['nop'] = $_POST['nop'];
        }
        if (isset($_POST['startDate'])) {
            $tripData['startDate'] = $_POST['startDate'];
        }
        if (isset($_POST['endDate'])) {
            $tripData['endDate'] = $_POST['endDate'];
        }
        if (isset($_POST['description'])) {
            $tripData['description'] = $_POST['description'];
        }
        return $tripData;
    }
    //*plan建立檢查
    public function insertPlanCheck()
    {
        $status = $this->Model->insertPlanCheck($this->gtPost['id']);
        if ($status == 'success') {
            return View::render(array('status' => false));
        }else {
            return View::render(array('status' => 'success'));
        }
    }
    //*建立plan資料
    public function newPlan()
    {
        $status = $this->Model->newPlan($this->gtPost);
        return View::render(array('status' => $status));
    }
    //*修改plan資料
    public function editPlan()
    {
        $status = $this->Model->editPlan($this->gtPost);
        if ($status == "成功") {
            return View::render(array('status' => $status));
        }else {
            return View::render(array('status' => false));
        }
    }
    //*刪除plan資料
    public function delPlan()
    {
        $status = $this->Model->delPlan($this->gtPost);
        if ($status == "成功") {
            return View::render(array('status' => "success"));
        }else {
            return View::render(array('status' => false));
        }
    }
    //*planList計畫總覽
    public function listsPlan()
    {
        $status = $this->Model->listsPlan($this->gtPost);
        if ($status == false) {
            return View::render(array('status' => false));
        }else {
            return View::render(array('status' => $status));
        }
    }
    //*uniquePlanLists單一計畫瀏覽
    public function uniqueListsPlan()
    {
        $status = $this->Model->uniqueListsPlan($_GET['id']);
        if ($status == false) {
            return View::render(array('status' => false));
        }else {
            return View::render(array('status' => $status));
        }
    }
}
