package com.fenquan.demo.controller;

import com.fenquan.demo.entity.FormCreate;
import com.fenquan.demo.entity.FormShouJi;
import com.fenquan.demo.service.IFormCreateService;
import com.fenquan.demo.service.IFormShouJiService;
import com.fenquan.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;


@Slf4j
@RestController
@RequestMapping("/formShouJi")
public class FormShouJiController {

    @Autowired
    IFormShouJiService iFormShouJiService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //管理员获取全部表单
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session,int id) {
        try {
            String token = SessionUtil.getToken(session);
            String[] token_list = token.split(",");
            String[] powerArr = token_list[4].split("\"");
            String[] nameArr = token_list[1].split("\"");
            token_list = token_list[5].split("\"");
            String login_company = token_list[3];
            String power = powerArr[3];
            String name = nameArr[3];
            List<FormShouJi> select_list = null;
            select_list = iFormShouJiService.getList(login_company,id);
            return ResultInfo.success("获取成功", select_list);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


    /*
     *添加
     * */
    @RequestMapping("/add")
    public ResultInfo add(@RequestBody String menuSettingsJson,HttpSession session){
        FormShouJi formShouJi = null;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        String formattedDate = formatter.format(date);
        try{
            formShouJi = DecodeUtil.decodeToJson(menuSettingsJson, FormShouJi.class);
            formShouJi.setInsertDate(formattedDate);
            formShouJi = iFormShouJiService.add(formShouJi);
            if (StringUtils.isNotNull(formShouJi)) {
                return ResultInfo.success("提交成功", formShouJi);
            } else {
                return ResultInfo.success("提交失败", null);
            }
        }catch (Exception e){
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            return ResultInfo.error("添加失败");
        }
    }


    /*
     *删除
     * */
    @RequestMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map, HttpSession session){
        try{
            GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
            List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
            if (iFormShouJiService.delete(idList)) {
                return ResultInfo.success("删除成功", idList);
            } else {
                return ResultInfo.success("删除失败", idList);
            }
        }catch (Exception e){
            e.printStackTrace();
            log.error("删除失败：{}", e.getMessage());
            return ResultInfo.error("删除失败");
        }
    }



    /**
     * 表名与公司字段名的映射关系
     */
    private Map<String, String> getCompanyColumnMap() {
        Map<String, String> map = new HashMap<>();
        map.put("form_create", "company");           // 假设这个表的公司字段是 company
        map.put("userInfo", "company");  // 假设这个表的公司字段是 company
        return map;
    }

    /**
     * 获取指定公司所有表的数据大小（支持不同表的不同公司字段名）
     */
    @GetMapping("/getCompanyTableSizes")
    public ResultInfo getCompanyTableSizes(@RequestParam String companyName) {
        try {
            String[] tableNames = {
                    "form_create", "userInfo"
            };

            // 获取字段映射
            Map<String, String> columnMap = getCompanyColumnMap();

            List<Map<String, Object>> tableSizes = new ArrayList<>();
            long totalSizeKB = 0;

            for (String tableName : tableNames) {
                Map<String, Object> tableInfo = new HashMap<>();
                tableInfo.put("tableName", tableName);

                try {
                    // 获取该表的公司字段名
                    String companyColumn = columnMap.get(tableName);
                    if (companyColumn == null) {
                        log.warn("表 {} 未配置公司字段映射", tableName);
                        tableInfo.put("error", "未配置公司字段映射");
                        tableSizes.add(tableInfo);
                        continue;
                    }

                    // 获取该公司在该表中的数据大小
                    Map<String, Object> companyData = getCompanyTableData(tableName, companyColumn, companyName);
                    long sizeKB = (Long) companyData.get("sizeKB");
                    long rowCount = (Long) companyData.get("rowCount");

                    tableInfo.put("companyColumn", companyColumn);
                    tableInfo.put("sizeKB", sizeKB);
                    tableInfo.put("sizeMB", sizeKB / 1024.0);
                    tableInfo.put("sizeFormatted", formatSize(sizeKB * 1024));
                    tableInfo.put("rows", rowCount);

                    totalSizeKB += sizeKB;

                } catch (Exception e) {
                    log.warn("获取表 {} 数据大小失败: {}", tableName, e.getMessage());
                    tableInfo.put("error", e.getMessage());
                }

                tableSizes.add(tableInfo);
            }

            Map<String, Object> result = new HashMap<>();
            result.put("companyName", companyName);
            result.put("tables", tableSizes);
            result.put("totalSizeKB", totalSizeKB);
            result.put("totalSizeMB", totalSizeKB / 1024.0);
            result.put("totalSizeGB", totalSizeKB / (1024.0 * 1024));
            result.put("totalSizeFormatted", formatSize(totalSizeKB * 1024));

            return ResultInfo.success("获取成功", result);

        } catch (Exception e) {
            log.error("获取公司数据大小失败", e);
            return ResultInfo.error("获取失败: " + e.getMessage());
        }
    }

    /**
     * 获取表中某个公司的数据大小（支持动态字段名）
     */
    private Map<String, Object> getCompanyTableData(String tableName, String companyColumn, String companyName) {
        Map<String, Object> resultMap = new HashMap<>();

        try {
            // 动态构建 SQL，使用传入的字段名
            String sql = "SELECT " +
                    "    COUNT(*) AS row_count, " +
                    "    ISNULL(ROUND(SUM(DATALENGTH(ISNULL(CAST(" + companyColumn + " AS NVARCHAR(MAX)), ''))) / 1024.0, 2), 0) AS data_size_kb " +
                    "FROM " + tableName + " " +
                    "WHERE " + companyColumn + " = ?";

            Map<String, Object> result = jdbcTemplate.queryForMap(sql, companyName);

            long rowCount = ((Number) result.get("row_count")).longValue();
            long sizeKB = 0;
            Object sizeObj = result.get("data_size_kb");
            if (sizeObj != null) {
                sizeKB = ((Number) sizeObj).longValue();
            }

            resultMap.put("sizeKB", sizeKB);
            resultMap.put("rowCount", rowCount);

        } catch (Exception e) {
            log.error("获取公司数据失败: {} - {} - {}", tableName, companyColumn, companyName, e);
            resultMap.put("sizeKB", 0L);
            resultMap.put("rowCount", 0L);
        }

        return resultMap;
    }

    /**
     * 格式化大小
     */
    private String formatSize(long size) {
        if (size <= 0) return "0 B";

        String[] units = {"B", "KB", "MB", "GB", "TB"};
        int digitGroups = (int) (Math.log10(size) / Math.log10(1024));
        return String.format("%.2f %s", size / Math.pow(1024, digitGroups), units[digitGroups]);
    }

}
