<?php

(defined('BASEPATH')) OR exit('No direct script access allowed');

/**
 * Image CMS 
 * Sample Module Admin
 */
class Admin extends BaseAdminController {

    public function __construct() {
        parent::__construct();
        $this->load->model('email_model');
    }

    public function index() {
        
    }
    public function settings(){
       \CMSFactory\assetManager::create()
                ->setData('settings', $this->email_model->getSettings())
                ->renderAdmin('settings');
    }

    /**
     * updare settings for email
     */
    public function update_settings() {
        
        if ($_POST) {
            $this->email_model->setSettings($_POST['settings']);
        }
    }
}