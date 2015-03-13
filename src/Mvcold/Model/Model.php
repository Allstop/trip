<?php
namespace Mvc\Model;

class Model
{
    private static $db = null;
    protected $status = false;

    public function __construct()
    {
        try {
            $conn = new \PDO('mysql:host=127.0.0.1;dbname=trip', 'root', '1234');
            //*錯誤處理,方式為拋出異常
            $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            //* 轉型utf8
            $conn->query('set character set utf8');
            self::$db = $conn;
            $this->status = true;
        } catch (PDOException $e) {
            $this->status = false;
            return;
        }
    }
    //*寫入新計畫
    public function newPlan($gtPost)
    {
        if ($this->status !== true) {
            return 'error in create!';
        }
        try{
            $this->tripData = array();
            $_title = $gtPost['title'];
            $_introduction = $gtPost['introduction'];
            $_nop = $gtPost['nop'];
            $_startDate = $gtPost['startDate'];
            $_endDate = $gtPost['endDate'];
            $_description = $gtPost['description'];
            $sql = self::$db->prepare("INSERT INTO plan (title, introduction, nop, startDate, endDate, description)
            VALUES (:title, :introduction, :nop, :startDate, :endDate, :description)");
            $sql->bindvalue (':title', $_title);
            $sql->bindvalue (':introduction', $_introduction);
            $sql->bindvalue (':nop', $_nop);
            $sql->bindvalue (':startDate', $_startDate);
            $sql->bindvalue (':endDate', $_endDate);
            $sql->bindvalue (':description', $_description);
            $this->triprData = $sql;
            return ($sql->execute()) ? '成功' : '失敗';
        }catch(PDOException $e){
            return 'error in insert!';
        }
    }
    //*計畫清單
    public function listsPlan()
    {
        if ($this->status !== true) {
            return 'error';
        }
        try {
            $this->tripList = array();
            $sql = self::$db->prepare("SELECT * FROM plan");
            if ($sql->execute()) {
                $this->tripList=$sql;
                return $sql->fetchAll(\PDO::FETCH_ASSOC);
            }else{
                return false;
            }
        }catch(\PDOException $e){
            return false;
        }
    }
    //*單一計畫清單
    public function uniqueListsPlan($id){
        if ($this->status !== true) {
            return false;
        }
        try {
            $sql = self::$db->prepare("SELECT * FROM plan where id='".$id."'");
            if ($sql->execute()) {
                return $sql->fetchAll(\PDO::FETCH_ASSOC);
            }else{
                return false;
            }
        }catch(\PDOException $e){
            return false;
        }
    }
    //*檢查建立資料是否已存在
    public function  insertPlanCheck($id){
        $sql = self::$db->query("SELECT title FROM plan
        where id='".$id."'");
        if ($sql->fetch()) {
            return $id;
        } else {
            return false;
        }
    }
    //*edit
    public function editPlan($gtPost)
    {
        if ($this->status !== true) {
            return 'error in create!';
        }
        try{
            $this->tripData = array();
            $_title = $gtPost['title'];
            $_introduction = $gtPost['introduction'];
            $_nop = $gtPost['nop'];
            $_startDate = $gtPost['startDate'];
            $_endDate = $gtPost['endDate'];
            $_description = $gtPost['description'];
            $sql = self::$db->prepare("UPDATE plan SET title = ':title',
                                                       introduction = ':introduction',
                                                       nop = ':nop',
                                                       startDate = ':startDate',
                                                       endDate = ':endDate',
                                                       description = ':description'
                                                       WHERE title = '$_title'");
            $sql->bindvalue (':title', $_title);
            $sql->bindvalue (':introduction', $_introduction);
            $sql->bindvalue (':nop', $_nop);
            $sql->bindvalue (':startDate', $_startDate);
            $sql->bindvalue (':endDate', $_endDate);
            $sql->bindvalue (':description', $_description);
            $this->triprData = $sql;
            return ($sql->execute()) ? '成功' : '失敗';
        }catch(PDOException $e){
            return false;
        }
    }
    //del
    public function delPlan($gtPost)
    {
        if ($this->status !== true) {
            return 'error';
        }
        try{
            $this->tripData = array();
            $_title = $gtPost['title'];
            var_dump($_title);
            $sql = self::$db->prepare("DELETE FROM plan WHERE title = '$_title' ");
            $sql->bindvalue (':title', $_title);
            $this->triprData = $sql;
            return ($sql->execute()) ? '成功' : '失敗';
        }catch(PDOException $e){
            return false;
        }
    }
    //*單一計畫項目清單
    public function uniquePlanItemLists($PlanId)
    {
        if ($this->status !== true) {
            return 'error';
        }
        var_dump($PlanId);
        try {
            $sql = self::$db->prepare("SELECT * FROM planitem where planid = '$PlanId'");
            if ($sql->execute()) {
                return $sql->fetchAll(\PDO::FETCH_ASSOC);
            }else{
                return 'error in uniquePlanItemLists1!';
            }
        }catch(\PDOException $e){
            return 'error in uniquePlanItemLists2!';
        }
    }
}
