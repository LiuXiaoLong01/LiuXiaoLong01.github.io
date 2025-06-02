### 教程介绍
EMLOG在删除文章后ID就会断掉，现在只需要简单修改一下代码，后面新增文章的时候就会优先选择断掉的文章ID。
### 修改步骤
1、找到路径下的include/model/log_model.php文件，将原始代码如下：
```php
/**
* 添加文章、页面
*
* @param array $logData
* @return int
*/
function addlog($logData) {
    $kItem = array();
    $dItem = array();
    foreach ($logData as $key => $data) {
        $kItem[] = $key;
        $dItem[] = $data;
    }
    $field = implode(',', $kItem);
    $values = "'" . implode("','", $dItem) . "'";
    $this->db->query("INSERT INTO " . DB_PREFIX . "blog ($field) VALUES ($values)");
    $logid = $this->db->insert_id();
    return $logid;
}
```
2、修改为以下代码：
```php
/**
    * 添加文章、页面
    *
    * @param array $logData
    * @return int
    */
    function addlog($logData) {
        $kItem = array();
        $dItem = array();
        foreach ($logData as $key => $data) {
            $kItem[] = $key;
            $dItem[] = $data;
        }
        $field = implode(',', $kItem);
        $values = "'" . implode("','", $dItem) . "'";
        $gidarr[0]='0';
        $res = $this->db->query("SELECT gid From  " . DB_PREFIX . "blog ORDER BY gid ASC");
        while ($row = $this->db->fetch_array($res)) {
            $gidarr[] = $row['gid'];
        }
        foreach($gidarr as $key=>$val){
            if($key!=$val){
                $field = 'gid,'.$field;
                $values = "'".$key."',".$values;
                break;
            }
        }
        $this->db->query("INSERT INTO " . DB_PREFIX . "blog ($field) VALUES ($values)");
        $logid = $this->db->insert_id();
        return $logid;
    }
```
