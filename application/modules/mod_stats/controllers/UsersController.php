<?php

/**
 * Class UsersController for mod_stats module
 * @uses ControllerBase
 * @author DevImageCms
 * @copyright (c) 2014, ImageCMS
 * @package ImageCMSModule
 */
class UsersController extends ControllerBase {

    public $params = array();

    public function __construct($controller) {
        parent::__construct($controller);
        $controller->import('traits/DateIntervalTrait.php');
        $this->params = array(
            'dateFrom' => isset($_GET['from']) ? $_GET['from'] : '2005-05-05',
            'dateTo' => isset($_GET['to']) ? $_GET['to'] : date("Y-m-d"),
            'interval' => isset($_GET['group']) ? $_GET['group'] : 'day',
        );
    }

    /**
     * Show template for users online with data
     */
    public function online() {
        $this->controller->load->model('attendance_model');
        $onlineUsers = $this->controller->attendance_model->getOnline();
        $this->renderAdmin('online', array(
            'data' => $onlineUsers
        ));
    }

    /**
     * Show template for users online with data
     */
    public function history() {
        $this->controller->load->model('attendance_model');
        $data = $this->controller->attendance_model->getUserHistory($_POST['userId']);
        $this->controller->assetManager->setData(array('data' => $data));
        $this->controller->assetManager->render('admin/users/history');
    }

    /**
     * Render template for users info with data
     */
    public function info() {
        $this->controller->load->model('users_model');
        $this->controller->users_model->setParams($this->params);
        $data = $this->controller->users_model->getInfo();
        $this->renderAdmin('info', array(
            'data' => $data
        ));
    }

    /**
     * Render template for users attendance with data
     */
    public function attendance() {
        // getting view type
        if (isset($_GET['view_type'])) {
            $vt = $_GET['view_type'];
            $viewType = $vt == 'table' || $vt == 'chart' ? $vt : 'chart';
        } else {
            $viewType = 'table';
        }

        $this->controller->import('traits/DateIntervalTrait.php');
        $this->controller->load->model('attendance_model');

        $data = $this->controller->attendance_model->getCommonAttendance($this->params);

        $this->renderAdmin('attendance', array(
            'data' => $data,
            'viewType' => $viewType,
        ));
    }

    /**
     * Output chart data for users attendance
     */
    public function getAttendanceData() {
        $params = $this->params;

        $this->controller->import('traits/DateIntervalTrait.php');
        $this->controller->load->model('attendance_model');

        $params['type'] = 'registered';
        $data = $this->controller->attendance_model->getCommonAttendance($params);
        $registered = array();
        foreach ($data as $row) {
            $registered[] = array(
                'x' => $row['unix_date'] * 1000,
                'y' => (int) $row['users_count']
            );
        }

        $params['type'] = 'unregistered';
        $data = $this->controller->attendance_model->getCommonAttendance($params);
        $unregistered = array();
        foreach ($data as $row) {
            $unregistered[] = array(
                'x' => $row['unix_date'] * 1000,
                'y' => (int) $row['users_count']
            );
        }

        $this->controller->import('classes/ZeroFiller');

        echo json_encode(array(
            array('key' => 'Count of unique registered users', 'values' => ZeroFiller::fill($registered, 'x', 'y', $this->params['interval'])),
            array('key' => 'Count of unique unregistered users', 'values' => ZeroFiller::fill($unregistered, 'x', 'y', $this->params['interval'])),
        ));
    }

    /**
     * Render template for users registration
     */
    public function registered() {
        // getting view type
        if (isset($_GET['view_type'])) {
            $vt = $_GET['view_type'];
            $viewType = $vt == 'table' || $vt == 'chart' ? $vt : 'chart';
        } else {
            $viewType = 'table';
        }

        $params = array(
            'dateFrom' => isset($_GET['from']) ? $_GET['from'] : '2005-05-05',
            'dateTo' => isset($_GET['to']) ? $_GET['to'] : date("Y-m-d"),
            'interval' => isset($_GET['group']) ? $_GET['group'] : 'day',
        );

        $this->controller->load->model('users_model');
        $this->controller->users_model->setParams($params);
        $data = $this->controller->users_model->getRegister();
        
        $this->renderAdmin('registered', array(
            'data' => $data,
            'viewType' => $viewType,
        ));
    }

    /**
     * Output chart data for users registration
     */
    public function getRegisterData() {
        $params = array(
            'dateFrom' => isset($_GET['from']) ? $_GET['from'] : '2005-05-05',
            'dateTo' => isset($_GET['to']) ? $_GET['to'] : date("Y-m-d"),
            'interval' => isset($_GET['group']) ? $_GET['group'] : 'day',
        );

        $this->controller->load->model('users_model');
        $this->controller->users_model->setParams($params);
        $data = $this->controller->users_model->getRegister();
        $chartValues = array();
        foreach ($data as $row) {
            $chartValues[] = array(
                'x' => (int) $row['unix_date'] * 1000,
                'y' => (int) $row['count']
            );
        }
        $this->import('classes/ZeroFiller');
        echo json_encode(
                array(
                    array(
                        'key' => 'Registration dynamic',
                        'values' => ZeroFiller::fill($chartValues, 'x', 'y', isset($_GET['group']) ? $_GET['group'] : 'day')
                    )
                )
        );
    }

}

?>
