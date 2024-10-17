package com.fenquan.demo.controller;

import com.fenquan.demo.util.QRCodeUtil;
import com.google.zxing.WriterException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.json.JSONObject;
import java.io.IOException;
@Slf4j
@RestController
@RequestMapping("/ewm")
public class erweima {

    @PostMapping("/erweima")
    public String generateQRCode(@RequestBody String url) {
        try {
            String jsonString = url;
            JSONObject jsonObject = new JSONObject(jsonString);
            String url1 = jsonObject.getString("url");
            url1 = url1.replace("\\\"", "");
            url1 = url1.replace("\"", "");
            System.out.println(url1);
            System.out.println("--------------------------------------------");
            System.out.println(url);
            System.out.println(QRCodeUtil.generateQRCode(url));
            System.out.println("--------------------------------------------");
            return QRCodeUtil.generateQRCode(url1);
        } catch (WriterException | IOException e) {
            e.printStackTrace();
            return "Error generating QR code";
        } catch (JSONException e) {
            e.printStackTrace();
            return "Error generating QR code";
        }
    }
}
