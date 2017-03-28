<?php

/**
 * Created by PhpStorm.
 * User: dragon
 * Date: 2017/3/25
 * Time: 20:05
 */
class GameRules_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function readData($condition){

        $list = [];
        $data = [];
        $where = [
            'en_name' => $condition,

        ];
        $this->db->where($where);
        $query = $this->db->get('ht_game_rules');


        foreach($query->result() as $row){
            $list[] = $row;
        }

        $introduction = $list[0];

        array_splice($list,0,1);


        foreach ($list as $key => $value){
            $data[$value->title][] = $value->content;
        }

//        var_dump($result);
        $result['introduction'] = $introduction->content;
        $result['data'] = $data;

        return $result;
    }

}