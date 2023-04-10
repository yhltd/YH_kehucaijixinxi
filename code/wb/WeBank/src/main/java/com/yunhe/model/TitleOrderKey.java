package com.yunhe.model;

import com.yunhe.entity.Title;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TitleOrderKey extends Title {

    private String orderKey;
}
