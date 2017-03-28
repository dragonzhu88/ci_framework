<?php

/**
 * Created by PhpStorm.
 * User: dragon
 * Date: 2017/3/28
 * Time: 13:57
 */
class GameTips_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function readData($condition){
        $where = [
            'game_en_name' => $condition,

        ];
        $this->db->where($where);
        $query = $this->db->get('ht_game_tips');

        $result = $query->row_array();

        return $result;
    }
}