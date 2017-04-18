<?php

/**
 * Created by PhpStorm.
 * User: dragon
 * Date: 2017/4/17
 * Time: 20:28
 */
class Editor extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function index()
    {
        $result['test'] = 'test';
        $this->load->view('editor/editor', $result);
    }

    public function get_user_data()
    {
        try {
            $where = [
                'gid' => 10,
            ];

            $this->db->where($where);
            $query = $this->db->get('ht_game_rule');
            $data = $query->result_array();

            echo json_encode($data, JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            echo json_encode($e->getMessage(), JSON_UNESCAPED_UNICODE);
            exit();
        }


    }

    public function create_game_data()
    {

        try {
            $gid = $_POST['gid'];
            $title = $_POST['title'];
            $content = $_POST['content'];

            $data = [
                'gid' => $gid,
                'title' => $title,
                'content' => $content,
            ];

            if ($gid == null || $title == null || $gid == null) {
                throw new Exception('gid or title = null', 101);
            }

            $this->db->insert('ht_game_rule', $data);

            $result = [
                'code' => 200,
                'msg' => 'ok',
            ];

            echo json_encode($result, JSON_UNESCAPED_UNICODE);

        } catch (Exception $e) {

            echo json_encode($e->getMessage(), JSON_UNESCAPED_UNICODE);
            exit();
        }
    }

    public function update_game_data(){
        try{
            $id = $_REQUEST['id'];
            $gid = $_REQUEST['gid'];
            $title = $_REQUEST['title'];
            $content = $_REQUEST['content'];

            $data = array(
                'title' => $title,
                'gid' => $gid,
                'content' => $content
            );

            $this->db->where('id', $id);
            $this->db->update('ht_game_rule', $data);

            $result = [
                'code' => 200,
                'msg' => 'ok',
            ];
            echo json_encode($result, JSON_UNESCAPED_UNICODE);

        }catch (Exception $e){
            echo json_encode($e->getMessage(), JSON_UNESCAPED_UNICODE);
            exit();
        }
    }

    public function delete_game_data()
    {
        try {
            $id = $_POST['id'];
            $where = [
                'id' => $id,
            ];

            if($id == null){
                throw new Exception('id is null',101);
            }

            $this->db->where($where);
            $this->db->delete('ht_game_rule');

            $result = [
                'code' => 200,
                'msg' => 'ok'
            ];
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            echo json_encode($e->getMessage(), JSON_UNESCAPED_UNICODE);
            exit();
        }
    }

}