import React from "react";
import {
    Avatar,
    Button,
    Checkbox,
    Col,
    DatePicker,
    Image,
    Input,
    notification,
    Row,
    Select,
    TimePicker,
    Tooltip,
    Transfer,
    Upload,
    Radio,
    Divider,
} from "antd";
import {
    PaperClipOutlined,
    UploadOutlined,
    BellOutlined,
    ClockCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import moment from "momment";

/**
 *
 * @param type {("file" | "image" | "image-multiple" | "transfer-multiple" | "clock" | "hour" | "minute" | "second" | "date" | "datetime" | "date-range" | "month" | "year" |
 *              "select-search" | "select-boolean" | "select" | "multiple" | "ckeditor" | "number" | "salaryNumber" | "currency" |
 *              "online-search" | "search" | "text" | "phoneNumber" | "textarea" | "position" | "product" | "product-rent" | "customer" | "contract")}
 * @param data {{
 *     placeholder: string,
 *     value: any,
 *     disabled: boolean,
 *     disabledDate: (function | Array)
 *     options: Array,
 *     selectKeyLabel: string,
 *     selectKeyValue: string,
 *     noAllowClear: boolean,
 *     config: Object,
 *     keySearch: string,
 *     apiSearch: string
 * }}
 * @param actions {{
 *     onChange: function
 * }}
 * @returns {*}
 */

const getInput = (type, data = {}, actions = {}) => {
    const {
        disabled,
        values,
        title,
        readOnly,
        suffixIcon,
        isNotAvatar,
        classItems,
        defaultValue,
        selectAllButton,
    } = data;
    let { disabledDate, value, placeholder, icon } = data;
    let { options, selectKeyLabel, selectKeyValue, noAllowClear } = data;
    selectKeyValue = selectKeyValue ?? "id";
    selectKeyLabel = selectKeyLabel ?? "name";
    let {
        renderItem,
        renderContentItem,
        apiSearch,
        fnConvertRawData,
        fnConvertQuery,
        modalWidth,
    } = data;

    const { render } = data;
    const { config = {}, key } = data;
    const { onChange } = actions;
    const normalizeText = (str) => {
        return str;
    };
    switch (type) {
        case "text_area":
            const CustomInput1 = type === "text_area" ? Input.TextArea : Input;
            return (
                <CustomInput1
                    onChange={(event) => {
                        let value = event.target.value;
                        onChange(value);
                    }}
                    placeholder={placeholder}
                    value={value}
                    name={key}
                    autoComplete="off"
                    type={type ?? "search"}
                    maxLength={type === "text_area" ? 1000 : 50}
                    disabled={readOnly ?? disabled}
                    rows={1}
                />
            );
        case "password":
            return (
                <Input.Password
                    onChange={(event) => {
                        let value = event.target.value;
                        onChange(value);
                    }}
                    placeholder={placeholder}
                    value={value}
                    name={key}
                    autoComplete="off"
                    maxLength={255}
                    disabled={readOnly ?? disabled}
                />
            );
        case "transfer-multiple":
            return (
                <Transfer
                    titles={["Chưa chọn", "Đã chọn"]}
                    showSearch
                    showSelectAll
                    dataSource={options}
                    targetKeys={value}
                    render={render ? render : (item) => item.title}
                    onChange={(next) => {
                        onChange(next);
                    }}
                    filterOption={(inputValue, option) => {
                        return normalizeText(option.title).includes(
                            normalizeText(inputValue),
                        );
                    }}
                    locale={{
                        selectAll: "Chọn tất cả các trang",
                        remove: "Xóa",
                        removeAll: "Xóa tất cả",
                        removeCurrent: "Xóa trang này",
                        selectCurrent: "Chọn trang này",
                        selectInvert: "Đảo chọn trang này",
                    }}
                    pagination={{
                        pageSize: 100,
                        showSizeChanger: false,
                    }}
                />
            );
        case "clock":
        case "hour":
        case "minute":
        case "second":
            return (
                <TimePicker
                    onChange={(value) => {
                        if (readOnly) return;
                        if (config.value?.getObject) {
                            onChange(value);
                        } else {
                            onChange(
                                value
                                    ? value.format(
                                          config.value?.format ?? "HH:mm:ss",
                                      )
                                    : value,
                            );
                        }
                    }}
                    bordered={!readOnly}
                    placeholder={readOnly ? null : placeholder}
                    value={
                        value
                            ? moment(value, config.value?.format ?? "HH:mm:ss")
                            : null
                    }
                    name={key}
                    disabled={readOnly ?? disabled}
                />
            );
        case "datetime-customs":
            const range = (start, end) => {
                const result = [];
                for (let i = start; i < end; i++) {
                    result.push(i);
                }
                return result;
            };
            return (
                <div className="d-flex justify-content-between w-100 position-relative align-items-center">
                    <DatePicker
                        format={"DD/MM/YYYY"}
                        placeholder="DD/MM/YYYY"
                        value={
                            value ? moment(value).subtract(7, "h") : undefined
                        }
                        disabled={disabled}
                        onSelect={(val) => {
                            if (readOnly) return;
                            onChange(
                                moment(value)
                                    .add(
                                        moment(val).diff(moment(value), "h"),
                                        "h",
                                    )
                                    .format()
                                    .toString()
                                    .replace("+07:00", ".000Z"),
                            );
                        }}
                        allowClear={false}
                    />
                    -
                    <TimePicker
                        disabledTime={() => ({
                            disabledHours: () =>
                                range(0, 7).concat(range(20, 24)),
                        })}
                        placeholder="hh:mm"
                        minuteStep={15}
                        disabled={disabled}
                        allowClear={false}
                        format={"HH:mm"}
                        footer={null}
                        value={
                            value ? moment(value).subtract(7, "h") : undefined
                        }
                        onSelect={(val) => {
                            if (readOnly) return;
                            onChange(
                                moment(value)
                                    .subtract(7, "h")
                                    .format("YYYY-MM-DD"),
                            );
                        }}
                    />
                </div>
            );

        case "date":
        case "month":
        case "year":
        case "datetime":
        case "date-range":
        case "datetime-range":
            let CustomPicker = {
                date: DatePicker,
                month: DatePicker.MonthPicker,
                year: DatePicker.YearPicker,
                datetime: DatePicker,
                "date-range": DatePicker.RangePicker,
                "datetime-range": DatePicker.RangePicker,
            }[type];

            let dataFormat = {
                datetime: "YYYY-MM-DD HH:mm",
                date: "YYYY-MM-DD",
                month: "YYYY-MM",
                year: "YYYY",
                "date-range": "YYYY-MM-DD",
                "datetime-range": "YYYY-MM-DD HH:mm:ss",
            }[type];
            let displayFormat = {
                datetime: "DD/MM/YYYY HH:mm",
                date: "DD/MM/YYYY",
                month: "MM/YYYY",
                year: "YYYY",
                "date-range": "DD/MM/YYYY",
                "datetime-range": "DD/MM/YYYY HH:mm:ss",
            }[type];

            let valueFormat = undefined;
            if (value) {
                if (type === "date-range" || type === "datetime-range") {
                    valueFormat = value.map((dt) =>
                        moment(dt, config.value?.format ?? dataFormat),
                    );
                } else {
                    valueFormat = moment(
                        value,
                        config.value?.format ?? dataFormat,
                    );
                }
            }

            return (
                <Tooltip title={title}>
                    <CustomPicker
                        showTime={
                            type === "datetime" || type === "datetime-range"
                        }
                        onChange={(value) => {
                            if (readOnly) return;
                            if (config.value?.getObject) {
                                onChange(value);
                            } else {
                                if (
                                    type === "date-range" ||
                                    type === "datetime-range"
                                ) {
                                    onChange(
                                        value
                                            ? value.map((dt) =>
                                                  dt.format(
                                                      config.value?.format ??
                                                          dataFormat,
                                                  ),
                                              )
                                            : value,
                                    );
                                } else {
                                    onChange(
                                        value
                                            ? value.format(
                                                  config.value?.format ??
                                                      dataFormat,
                                              )
                                            : value,
                                    );
                                }
                            }
                        }}
                        onKeyDown={(val) => {
                            if (val.key === "Enter") {
                                if (isNaN(val.target.value)) {
                                    val.target.value = null;
                                }
                            }
                        }}
                        bordered={!readOnly}
                        placeholder={readOnly ? null : placeholder}
                        value={valueFormat}
                        format={displayFormat}
                        name={key}
                        disabled={readOnly ?? disabled}
                        disabledDate={(current) => {
                            if (_.isFunction(disabledDate)) {
                                return disabledDate(current);
                            }
                            if (_.isArray(disabledDate)) {
                                return (
                                    current &&
                                    disabledDate.includes(
                                        current.format("YYYY-MM-DD"),
                                    )
                                );
                            }
                            return false;
                        }}
                        allowClear={!noAllowClear}
                    />
                </Tooltip>
            );
        case "select-search":
        case "select":
        case "select-boolean":
        case "multiple-user":
        case "multiple":
            return (
                <Select
                    mode={
                        type === "multiple" || type === "multiple-user"
                            ? "multiple"
                            : null
                    }
                    showSearch={
                        type === "select-search" ||
                        type === "multiple" ||
                        type === "multiple-user"
                    }
                    allowClear={!noAllowClear}
                    filterOption={(input, option) =>
                        normalizeText(option.children).includes(
                            normalizeText(input),
                        )
                    }
                    dropdownRender={
                        selectAllButton
                            ? (menu) => {
                                  const checked =
                                      value === undefined ||
                                      value?.length !== options?.length;
                                  return (
                                      <>
                                          {menu}
                                          <Divider
                                              style={{ margin: "8px 0" }}
                                          />
                                          <div
                                              className={
                                                  "d-flex justify-content-end"
                                              }
                                          >
                                              <Button
                                                  type="text"
                                                  style={
                                                      checked
                                                          ? null
                                                          : {
                                                                color: "deepskyblue",
                                                            }
                                                  }
                                                  onClick={() => {
                                                      onChange(
                                                          checked
                                                              ? options.map(
                                                                    (op) =>
                                                                        op[
                                                                            selectKeyValue
                                                                        ],
                                                                ) ?? []
                                                              : onChange([]),
                                                      );
                                                  }}
                                              >
                                                  Chọn tất cả
                                              </Button>
                                          </div>
                                      </>
                                  );
                              }
                            : false
                    }
                    value={options?.length > 0 ? value : defaultValue}
                    bordered={!readOnly}
                    onChange={(value) => {
                        if (readOnly) return;
                        if (config.value?.getObject) {
                            onChange(
                                options.find(
                                    (dt) => dt[selectKeyValue] === value,
                                ),
                            );
                        } else {
                            onChange(value);
                        }
                    }}
                    style={{
                        minWidth: "333px",
                    }}
                    onInput={(inputValue) => {
                        if (inputValue.target.value.length > 255) {
                            inputValue.target.value =
                                inputValue.target.value.slice(0, 255);
                        }
                    }}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    disabled={readOnly ?? disabled}
                    className={classItems}
                >
                    {options?.map((option) => (
                        <Select.Option
                            key={option[selectKeyValue]}
                            value={option[selectKeyValue]}
                            disabled={option.disabled}
                        >
                            {type === "multiple-user"
                                ? option["lastName"] + " " + option["firstName"]
                                : icon
                                ? placeholder + ": " + option[selectKeyLabel]
                                : option[selectKeyLabel]}
                        </Select.Option>
                    ))}
                </Select>
            );
        case "list-checkbox":
            return (
                <div className="d-flex align-items-center">
                    <Checkbox.Group
                        onChange={(value) => {
                            if (readOnly) return;
                            if (config.value?.getObject) {
                                onChange(
                                    options.find(
                                        (dt) => dt[selectKeyValue] === value,
                                    ),
                                );
                            } else {
                                onChange(value);
                            }
                        }}
                    >
                        {options?.map((el, index) => {
                            return (
                                <Checkbox value={el.id} key={index}>
                                    {el.name}
                                </Checkbox>
                            );
                        })}
                    </Checkbox.Group>
                </div>
            );

        case "select-user":
            return (
                <Select
                    showSearch={true}
                    allowClear={!noAllowClear}
                    filterOption={(input, option) =>
                        normalizeText(option.children).includes(
                            normalizeText(input.trim()),
                        )
                    }
                    value={value}
                    onChange={(value) => {
                        if (readOnly) return;
                        if (config.value?.getObject) {
                            onChange(
                                options.find(
                                    (dt) => dt[selectKeyValue] === value,
                                ),
                            );
                        } else {
                            onChange(value);
                        }
                    }}
                    onInput={(inputValue) => {
                        if (inputValue.target.value.length > 255) {
                            inputValue.target.value =
                                inputValue.target.value.slice(0, 255);
                        }
                    }}
                    maxLength={10}
                    bordered={!readOnly}
                    placeholder={readOnly ? null : placeholder}
                    disabled={readOnly ?? disabled}
                >
                    {options.map((option) => (
                        <Select.Option
                            key={option[selectKeyValue]}
                            value={option[selectKeyValue]}
                            disabled={option.disabled}
                        >
                            {option[selectKeyValue] === value && icon
                                ? placeholder +
                                  ": " +
                                  option["firstName"] +
                                  " " +
                                  option["lastName"]
                                : "" +
                                  option["firstName"] +
                                  " " +
                                  option["lastName"]}
                        </Select.Option>
                    ))}
                </Select>
            );
        case "number":
            return (
                <Input
                    type={"number"}
                    onChange={(event) => {
                        let value = event.target.value;
                        if (isNaN(value)) return;
                        if (value > 1000000000000 || value < 0) {
                            return;
                        }
                        onChange(Number(value));
                    }}
                    onInput={(inputValue) => {
                        const value = inputValue.target.value;
                        if (!value) {
                            inputValue.target.value = value;
                        }
                    }}
                    placeholder={placeholder}
                    value={_.toString(value)}
                    name={key}
                    autoComplete="off"
                    maxLength={50}
                    disabled={readOnly ?? disabled}
                    min={0}
                />
            );
        case "phoneNumber":
            return (
                <Input
                    type="text"
                    onChange={(event) => {
                        if (readOnly) return;
                        let value = event.target.value.trim();
                        if (["-", "+"].includes(value)) {
                            onChange(value);
                        } else if (!isNaN(value)) {
                            onChange(value);
                        } else {
                            return;
                        }
                    }}
                    bordered={!readOnly}
                    placeholder={readOnly ? null : placeholder}
                    value={value}
                    name={key}
                    autoComplete="off"
                    maxLength={15}
                    disabled={readOnly ?? disabled}
                />
            );
        case "numbers":
            return (
                <Input
                    type="text"
                    onChange={(event) => {
                        let value = event.target.value;
                        if (isNaN(value)) {
                            return;
                        }
                        onChange(value);
                    }}
                    placeholder={placeholder}
                    value={value}
                    name={key}
                    autoComplete="off"
                    maxLength={12}
                    disabled={readOnly ?? disabled}
                />
            );
        case "salaryNumber":
            return (
                <Input
                    type="number"
                    onChange={(event) => {
                        if (readOnly) return;
                        let value = event.target.value;
                        value = _.toNumber(value);
                        if (value > 1000000000) {
                            return;
                        }
                        onChange(value);
                    }}
                    bordered={!readOnly}
                    placeholder={readOnly ? null : placeholder}
                    value={_.toString(value)}
                    name={key}
                    autoComplete="off"
                    maxLength={50}
                    disabled={readOnly ?? disabled}
                />
            );
        case "currency":
            return (
                <Input
                    type="search"
                    onChange={(event) => {
                        let value = event.target.value;
                        value = value.replace(/\D+/g, "");
                        value = _.toNumber(value);
                        if (value > 1000000000000) {
                            return;
                        }
                        onChange(value);
                    }}
                    placeholder={placeholder}
                    value={_.isNumber(value) ? value.getMoneyFormat() : 0}
                    name={key}
                    autoComplete="off"
                    maxLength={50}
                    disabled={readOnly ?? disabled}
                />
            );
        case "ImageProduct":
            if (values?.length > 0) {
                const arr = values?.map((e) => {
                    return (
                        <Image
                            key={e?.id}
                            src={e?.url}
                            className="img-product"
                        ></Image>
                    );
                });
                return <div className="form-image">{arr}</div>;
            } else {
                return <div className="">Chưa có hình ảnh</div>;
            }
        case "search":
            return (
                <Tooltip title="title">
                    <Input
                        onChange={(event) => {
                            let value = event.target.value;
                            if (value.length > 255) return;
                            onChange(value);
                        }}
                        placeholder={placeholder}
                        value={value}
                        name={key}
                        autoComplete="off"
                        type={type ?? "search"}
                        maxLength={255}
                        disabled={readOnly ?? disabled}
                        rows={2}
                    />
                </Tooltip>
            );
        case "full-textarea":
            return (
                <Input.TextArea
                    onChange={(event) => {
                        if (readOnly) return;
                        let value = event.target.value;
                        onChange(value);
                    }}
                    bordered={!readOnly}
                    placeholder={readOnly ? null : placeholder}
                    value={value}
                    name={key}
                    autoComplete="off"
                    disabled={readOnly ?? disabled}
                    rows={28}
                />
            );
        case "card-custom":
            return (
                <div
                    className={
                        "justify-content-between d-flex w-100 " +
                        (disabled ? "card-custom-disable" : "card-custom")
                    }
                    style={{ height: "34px" }}
                >
                    <div className="d-flex align-items-center">
                        <ClockCircleOutlined
                            style={{ fontSize: "18px", color: "#5030e5" }}
                        />
                        <span className="ml-2 mr-2">{placeholder}</span>
                    </div>
                    {value && (
                        <div>
                            {moment(value).add(1, "day").format("DD/MM/YYYY")}
                        </div>
                    )}
                </div>
            );
        case "inputUser":
            return (
                <Input
                    onChange={(event) => {
                        let value = event.target.value;
                        if (value.length > 255) {
                            return;
                        }
                        onChange(value);
                    }}
                    className="card-custom"
                    bordered={!readOnly}
                    placeholder={readOnly ? null : placeholder}
                    value={value ? placeholder + ": " + value : placeholder}
                    name={key}
                    autoComplete="off"
                    type={type ?? "search"}
                    maxLength={255}
                    disabled={readOnly ?? disabled}
                />
            );
        case "coordinates":
            if (!_.isObject(value)) {
                value = { lat: null, lon: null };
            }
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                        width: "70%",
                    }}
                >
                    <Input
                        style={{
                            minWidth: "100px",
                        }}
                        placeholder={"Vĩ độ"}
                        value={value.lat}
                        name={key}
                        type={"number"}
                        onChange={(e) => {
                            let val = e.target.value;
                            val = parseFloat(val);
                            if (Number.isNaN(val)) val = null;
                            if (val < -90) {
                                val = -90;
                            } else if (val > 90) {
                                val = 90;
                            }
                            value["lat"] = val;
                            onChange(value);
                        }}
                        maxLength={255}
                    />
                    <Input
                        style={{
                            minWidth: "100px",
                        }}
                        placeholder={"Kinh độ"}
                        value={value.lon}
                        name={key}
                        type={"number"}
                        onChange={(e) => {
                            let val = e.target.value;
                            val = parseFloat(val);
                            if (Number.isNaN(val)) val = null;
                            if (val < -180) {
                                val = -180;
                            } else if (val > 180) {
                                val = 188;
                            }
                            value["lon"] = val;
                            onChange(value);
                        }}
                        maxLength={255}
                    />
                </div>
            );
        case "textarea":
        default:
            const CustomInput = type === "textarea" ? Input.TextArea : Input;
            return (
                <CustomInput
                    bordered={!readOnly}
                    placeholder={readOnly ? null : placeholder}
                    value={value}
                    name={key}
                    autoComplete="off"
                    type={type ?? "search"}
                    onChange={(event) => {
                        let value = event.target.value.trimStart();
                        onChange(value);
                    }}
                    maxLength={type === "textarea" ? 5000 : 255}
                    disabled={readOnly ?? disabled}
                    rows={2}
                />
            );
    }
};

/**
 *
 * @param type {("file" | "image" | "image-multiple" | "transfer-multiple" | "clock" | "hour" | "minute" | "second" | "date" | "datetime" | "date-range" | "month" | "year" |
 *              "select-search" | "select-boolean" | "select" | "multiple" | "ckeditor" | "number" | "salaryNumber" | "currency" |
 *              "online-search" | "search" | "text" | "phoneNumber" | "textarea" | "position" | "product" | "product-rent" | "customer" | "contract")}
 * @returns {null|string|boolean|*[]|number}
 */
const getDefaultValueInput = (type) => {
    switch (type) {
        case "select-boolean":
            return true;
        case "online-search":
        case "select":
        case "select-search":
        case "select-user":
            return undefined;
        case "date":
        case "datetime":
        case "date-range":
        case "month":
        case "year":
        case "clock":
        case "image":
        case "image-multiple":
        case "position":
        case "customer":
        case "product":
        case "product-rent":
        case "contract":
            return null;
        case "multiple":
        case "transfer-multiple":
            return [];
        case "number":
        case "salaryNumber":
        case "currency":
            return 0;
        case "search":
        case "text":
        case "product-table":
        case "textarea":
        case "ckeditor":
        default:
            return "";
    }
};

/**
 *
 */

export default {
    getInput,
    getDefaultValueInput,
};

export { getInput, getDefaultValueInput };
