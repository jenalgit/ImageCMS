<?php

require_once realpath(dirname(__FILE__) . '/../../..') . '/enviroment.php';

doLogin();
/**
 * Generated by PHPUnit_SkeletonGenerator 1.2.1 on 2013-07-03 at 12:33:50.
 */
class GiftTest extends PHPUnit_Framework_TestCase {

    /**
     * @var Gift
     */
    protected $object;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp() {

        require_once realpath(APPPATH) . '/modules/' . getModContDirName('mod_discount') . '/mod_discount/gift.php';
        $this->object = new Gift;
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown() {
        
    }

    /**
     * @covers Gift::is_gift_certificat
     */
    public function testIs_gift_certificat() {
        $this->assertTrue($this->object->is_gift_certificat());
    }

    /**
     * @covers Gift::get_gift_certificate
     */
    public function testGet_gift_certificate() {
        $gift = $this->object->get_gift_certificate('4a2vr23p6gx7w82f');
        $this->assertJson($gift);
        $gift_obj = json_decode($gift);
        $this->assertObjectHasAttribute('error', $gift_obj);
        $this->assertObjectHasAttribute('key', $gift_obj);
        $this->assertEquals(33, $gift_obj->gift_array->value);
    }

    /**
     * @covers Gift::render_gift_input
     */
    public function testRender_gift_input() {
        // Remove the following lines when you implement this test.
        $this->markTestIncomplete(
                'This test has not been implemented yet.'
        );
    }

    /**
     * @covers Gift::render_gift_succes
     */
    public function testRender_gift_succes() {
        // Remove the following lines when you implement this test.
        $this->markTestIncomplete(
                'This test has not been implemented yet.'
        );
    }

}
