<?php

$I = new AcceptanceTester($scenario);
initTest::login($I);
$I->amOnPage('/admin/components/run/shop/currencies');
$I->click(CurrenciesPage::$CreateCurrencyButton);
$I->waitForElement('.//*[@id="mod_name"]/label');
$I->see('Создание валюты', 'span.title');
$I->see('Свойства', './/*[@id="cur_cr_form"]/table/thead/tr/th');
$I->see('Название:', './/*[@id="cur_cr_form"]/table/tbody/tr/td/div/div[1]/label');
$I->see('ISO Код:', './/*[@id="cur_cr_form"]/table/tbody/tr/td/div/div[2]/label');
$I->see('Символ:', './/*[@id="cur_cr_form"]/table/tbody/tr/td/div/div[3]/label');
$I->see('Курс валюты:', './/*[@id="mod_name"]/label');
$I->see('(Например: USD)', './/*[@id="cur_cr_form"]/table/tbody/tr/td/div/div[2]/div/p');
$I->see('(Например: $)', './/*[@id="cur_cr_form"]/table/tbody/tr/td/div/div[3]/div/p');
$I->see('= 1.000 руб', './/*[@id="mod_name"]/div/p');
$I->see('Вернуться', CurrenciesPage::$GoBackButton);
$I->see('Создать', CurrenciesPage::$SaveButton);
$I->see('Создать и выйти', CurrenciesPage::$SaveAndExitButton);