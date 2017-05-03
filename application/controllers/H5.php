<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class H5 extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('GameRules_model');
        $this->load->model('GameTips_model');
    }

    public function index(){

        $this->load->view('h5/index');
    }

    public function every_color(){

        $result = $this->GameRules_model->readData(1);

//        $this->load->view('h5/game_rule',$result);

    }

    public function eleven_select_five(){
        $result = $this->GameRules_model->readData(2);
        $this->load->view('h5/game_rule',$result);
    }

    public function happy_ten_minutes(){
        $result = $this->GameRules_model->readData(3);
        $this->load->view('h5/game_rule',$result);
    }

    public function three_d_lottery(){
        $result = $this->GameRules_model->readData(4);
        $this->load->view('h5/game_rule',$result);
    }

    public function fast_three(){
        $result = $this->GameRules_model->readData(5);
        $this->load->view('h5/game_rule',$result);
    }

    public function fast_eight(){
        $result = $this->GameRules_model->readData(6);
        $this->load->view('h5/game_rule',$result);
    }

    public function fast_ten(){
        $result = $this->GameRules_model->readData(7);
        $this->load->view('h5/game_rule',$result);
    }


    public function promotions_show(){
        $result['test'] = 'promotions';
        $this->load->view('h5/promotions_show',$result);
    }


    public function game_tips_api_every_color(){
        $result = $this->GameTips_model->readData('every_color');
        echo json_encode($result,JSON_UNESCAPED_UNICODE);
    }

    public function game_tips_api_pk_ten(){
        $result = $this->GameTips_model->readData('pk_ten');
        echo json_encode($result,JSON_UNESCAPED_UNICODE);
    }

    public function game_tips_api_fast_three(){
        $result = $this->GameTips_model->readData('fast_three');
        echo json_encode($result,JSON_UNESCAPED_UNICODE);
    }

    public function game_tips_api_eleven_select_five(){
        $result = $this->GameTips_model->readData('eleven_select_five');
        echo json_encode($result,JSON_UNESCAPED_UNICODE);
    }


    public function game_tips_api_three_d_lottery(){
        $result = $this->GameTips_model->readData('three_d_lottery');
        echo json_encode($result,JSON_UNESCAPED_UNICODE);
    }

    public function game_record_every_color(){
        $result['test'] = 'promotions';
        $this->load->view('h5/record_every_color',$result);

    }

    public function game_record_pk_ten(){
        $result['test'] = 'promotions';
        $this->load->view('h5/record_pk_ten',$result);
    }

    public function game_record_fast_three(){
        $result['test'] = 'promotions';
        $this->load->view('h5/record_fast_three',$result);
    }

    public function game_record_eleven_select_five(){
        $result['test'] = 'promotions';
        $this->load->view('h5/record_eleven_select_five',$result);
    }

    public function game_record_three_d_lottery(){
        $result['test'] = 'promotions';
        $this->load->view('h5/record_three_d_lottery',$result);
    }

    public function game_record_hong_kong_lottery(){
        $result['test'] = 'promotions';
        $this->load->view('h5/record_hong_kong_lottery',$result);
    }

}
