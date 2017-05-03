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

    public function readData($gid)
    {

        try{
            $list = [];
            $data = [];
            $where = [
                'gid' => $gid,

            ];
            $this->db->where($where);
            $query = $this->db->get('ht_game_rule');


            foreach ($query->result() as $row) {
                $list[] = $row;
            }

            $introduction = $list[0];

            array_splice($list, 0, 1);


            foreach ($list as $key => $value) {
                $data[$value->title][] = $value->content;
            }

            $result['code'] = 200;
            $result['msg'] = 'OK';
            $result['data']['rows'] = $data;
            $result['data']['introduction'] = $introduction->content;
//            echo json_encode($result, JSON_UNESCAPED_UNICODE);
            return $result;

        }catch (Exception $e){
            echo json_encode($e->getMessage(), JSON_UNESCAPED_UNICODE);
            exit();
        }

    }

}