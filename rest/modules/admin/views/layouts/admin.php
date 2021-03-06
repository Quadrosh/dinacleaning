<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>

<div class="wrap">
    <?php
    NavBar::begin([
        'brandLabel' => 'Dinacleaning '. Yii::$app->user->identity['username'],
        'brandUrl' => '/admin/hash',
        'options' => [
            'class' => 'navbar-inverse navbar-fixed-top',
        ],
    ]);
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav navbar-right'],
        'items' => [
            ['label' => 'Отзывы', 'url' => ['/admin/review']],
            ['label' => 'Partners', 'url' => ['/admin/partners']],
            ['label' => 'Advantages', 'url' => ['/admin/advantages']],
            ['label' => 'Home Slides', 'url' => ['/admin/homeslidecrud']],
            ['label' => 'Pages', 'url' => ['/admin/pages']],
            ['label' => 'Prices', 'url' => ['/admin/prices']],
            ['label' => 'Tasks', 'url' => ['/admin/tasks']],
//            ['label' => 'Orders', 'url' => ['/admin/orders']],
//            ['label' => 'Orders',
//                'items' => [
//                    ['label' => 'Orders', 'url' => ['/admin/orders/index']],
//                    ['label' => 'Call Me', 'url' => ['/admin/callme/index']],
//                ],
//            ],
            [
                'label' => 'Заявки',
                'items' => [
                    ['label' => 'Orders', 'url' => ['/admin/orders/index']],
                    ['label' => 'Перезвони мне', 'url' => ['/admin/callme/index']],
                    ['label' => 'UTM', 'url' => ['/admin/orders/utm']],
                ],
            ],

            Yii::$app->user->isGuest ? (
                ['label' => 'Login', 'url' => ['/admin/default/login']]
            ) : (
                '<li>'
                . Html::beginForm(['/site/logout'], 'post')
                . Html::submitButton(
                    'Logout (' . Yii::$app->user->identity->username . ')',
                    ['class' => 'btn btn-link logout']
                )
                . Html::endForm()
                . '</li>'
            )
        ],
    ]);
    NavBar::end();
    ?>

    <div class="container">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
<!--        --><?//= \yii\bootstrap\Alert::widget() ?>
        <?= $content ?>
    </div>
</div>

<footer class="footer">
    <div class="container">
        <p class="pull-left">&copy; My Company <?= date('Y') ?></p>

        <p class="pull-right"><?= Yii::powered() ?></p>
    </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
