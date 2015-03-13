<?php
namespace Mvc\Model;

class ListModel
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
    //*寫入新項目
    public function newItem($getPost, $planId)
    {
        if ($this->status !== true) {
            return 'error in create!';
        }
        try{
            $_category = $getPost['category'];
            $_startTime = $getPost['startTime'];
            $_endTime = $getPost['endTime'];
            $_description = $getPost['description'];
            $_defaultCost = $getPost['defaultCost'];
            $_cost = $getPost['cost'];
            $sql = self::$db->prepare("INSERT INTO planitem (planid, category, starttime, endtime, description, defaultcost, cost, createon, modifyon)
            VALUES (:category, :startTime, :endTime, :description, :defaultCost, :cost)");
            $sql->bindvalue (':planId', $planId);
            $sql->bindvalue (':category', $_category);
            $sql->bindvalue (':startTime', $_startTime);
            $sql->bindvalue (':endTime', $_endTime);
            $sql->bindvalue (':description', $_description);
            $sql->bindvalue (':defaultCost', $_defaultCost);
            $sql->bindvalue (':cost', $_cost);
            return ($sql->execute()) ? '成功' : '失敗';
        }catch(PDOException $e){
            return 'error in insert!';
        }
    }
    //*計畫項目
    public function listsItem($getPost)
    {
        if ($this->status !== true) {
            return 'error';
        }
        try {
            $_id = $getPost['id'];
            $sql = self::$db->prepare("SELECT * FROM planitem where id='".$_id."'");
            if ($sql->execute()) {
                return $sql->fetchAll(\PDO::FETCH_ASSOC);
            }else{
                return false;
            }
        }catch(\PDOException $e){
            return false;
        }
    }
    //*edit
    public function editItem($getPost)
    {
        if ($this->status !== true) {
            return 'error in create!';
        }
        try{
            $_id = $getPost['id'];
            $_category = $getPost['category'];
            $_startTime = $getPost['startTime'];
            $_endTime = $getPost['endTime'];
            $_description = $getPost['description'];
            $_defaultCost = $getPost['defaultCost'];
            $_cost = $getPost['cost'];
            $sql = self::$db->prepare("UPDATE planitem SET category = ':category',
                                                       startTime = ':startTime',
                                                       endTime = ':endTime',
                                                       description = ':description',
                                                       defaultCost = ':defaultCost',
                                                       cost = ':cost',
                                                       WHERE id = '$_id'");
            $sql->bindvalue (':category', $_category);
            $sql->bindvalue (':startTime', $_startTime);
            $sql->bindvalue (':endTime', $_endTime);
            $sql->bindvalue (':description', $_description);
            $sql->bindvalue (':defaultCost', $_defaultCost);
            $sql->bindvalue (':cost', $_cost);
            return ($sql->execute()) ? '成功' : '失敗';
        }catch(PDOException $e){
            return false;
        }
    }
    //del
    public function delItem($getPost)
    {
        if ($this->status !== true) {
            return 'error';
        }
        try{
            $_id = $getPost['id'];
            $sql = self::$db->prepare("DELETE FROM planitem WHERE id = '$_id' ");
            $sql->bindvalue (':id', $_id);
            return ($sql->execute()) ? '成功' : '失敗';
        }catch(PDOException $e){
            return false;
        }
    }
}
