<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "pages_section_item".
 *
 * @property int $id
 * @property int|null $section_id
 * @property int|null $sort
 * @property string|null $head
 * @property string|null $description
 * @property string|null $text
 * @property string|null $conclusion
 * @property string|null $image
 * @property string|null $image_alt
 * @property string|null $image_title
 * @property string|null $call2action_description
 * @property string|null $call2action_name
 * @property string|null $call2action_link
 * @property string|null $call2action_class
 * @property string|null $call2action_comment
 * @property string|null $structure
 * @property string|null $custom_class
 * @property string|null $color_key
 * @property string|null $view
 * @property int|null $created_at
 * @property int|null $updated_at
 *
 * @property PagesSection $section
 */
class PagesSectionItem extends \yii\db\ActiveRecord
{

    const DEFAULT_VIEW = 'default';

    const VIEW_OPTIONS = [
        'default' => 'default',
    ];


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'pages_section_item';
    }

    public function behaviors()
    {
        return [
            'timestamp'  => [
                'class' => \yii\behaviors\TimestampBehavior::className(),
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['section_id', 'sort', 'created_at', 'updated_at'], 'integer'],
            [['text', 'image_title', 'structure', 'custom_class'], 'string'],
            [['head', 'description', 'conclusion', 'call2action_description'], 'string', 'max' => 510],
            [['image', 'image_alt', 'call2action_name', 'call2action_link', 'call2action_class', 'call2action_comment', 'color_key', 'view'], 'string', 'max' => 255],
            [['section_id'], 'exist', 'skipOnError' => true, 'targetClass' => PagesSection::class, 'targetAttribute' => ['section_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'section_id' => 'Section ID',
            'sort' => 'Sort',
            'head' => 'Head',
            'description' => 'Description',
            'text' => 'Text',
            'conclusion' => 'Conclusion',
            'image' => 'Image',
            'image_alt' => 'Image Alt',
            'image_title' => 'Image Title',
            'call2action_description' => 'Call2action Description',
            'call2action_name' => 'Call2action Name',
            'call2action_link' => 'Call2action Link',
            'call2action_class' => 'Call2action Class',
            'call2action_comment' => 'Call2action Comment',
            'structure' => 'Structure',
            'custom_class' => 'Custom Class',
            'color_key' => 'Color Key',
            'view' => 'View',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert)) {

            $article = $this->section;
            $article->updated_at = time();
            $article->save();

            if ($this->isNewRecord) {
                if (!$this->sort ) {
                    $count = count($article->items);
                    if ($count > 0) {
                        $this->sort = $count+1;
                    } else {
                        $this->sort = 1;
                    }
                }
                if (!$this->view) {
                    $this->view = static::DEFAULT_VIEW;
                }
            }

            return true;
        }
        return false;
    }


    /**
     * Gets query for [[Section]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSection()
    {
        return $this->hasOne(PagesSection::class, ['id' => 'section_id']);
    }



    public function deleteImage($propertyName)
    {
        $imageFile = Imagefiles::find()->where(['name'=>$this->$propertyName])->one();
        if ($imageFile) {
            $imageFile->delete();
        }
        $this->$propertyName = null;
        $this->save();
    }


    public static function moveUpBySort($id)
    {
        $model = self::findOne($id);
        $siblings = self::find()->where([
            'section_id'=>$model->section_id
        ])->orderBy(['sort'=>SORT_ASC])->all();
        if (count($siblings)>1) {
            foreach ($siblings as $key => $child) {
                if ($child['id'] == $id && $key > 0) {
                    $item = $child;
                    $siblings[$key] = $siblings[$key-1];
                    $siblings[$key-1] = $item;
                }
            }
            foreach ($siblings as $key => $child) {
                $child->sort = $key+1;
                $child->save();
            }
        }
    }

    public static function moveDownBySort($id)
    {
        $model = self::findOne($id);
        $siblings = self::find()->where([
            'section_id'=>$model->section_id
        ])->orderBy(['sort'=>SORT_ASC])->all();
        if (count($siblings)>1) {
            foreach ($siblings as $key => $child) {
                if ($child['id'] == $id && $key < count($siblings)-1) {
                    $item = $child;
                    $siblings[$key] = $siblings[$key+1];
                    $siblings[$key+1] = $item;
                }
            }
            foreach ($siblings as $key => $child) {
                $child->sort = $key+1;
                $child->save();
            }
        }
    }
}
