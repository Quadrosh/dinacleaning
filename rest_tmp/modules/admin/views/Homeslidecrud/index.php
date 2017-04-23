<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Home Slides';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="home-slides-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Home Slides', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
//            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'title',
            'lead',
            'lead2',
            'text:ntext',
            // 'image',
            // 'promolink',
            // 'promoname',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
</div>
