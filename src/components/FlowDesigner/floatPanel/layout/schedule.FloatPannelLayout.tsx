import React from 'react'
import { ScheduleNodePayload } from 'botbuilder-share'
import { Badge, Button, Checkbox, DatePicker, Form, Input, TimePicker } from 'antd';
import moment from 'moment';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const CheckboxGroup = Checkbox.Group;

interface ScheduleFloatPannelLayoutProps {
    payload: ScheduleNodePayload,
    nodeId: string,
    onChange: (payload: ScheduleNodePayload) => void,
    onDelete: () => void
}

export const ScheduleFloatPannelLayout: React.FC<ScheduleFloatPannelLayoutProps> = ({ payload, nodeId, onChange, onDelete }) => {
    const initialStartDate = payload.startDate ? moment(`${payload.startDate}`) : null
    const initialEndDate = payload.endDate ? moment(payload.endDate) : null
    const initialTime = (payload.hour && payload.minute) ? moment(`${payload.hour}:${payload.minute}`, "HH:mm") : null

    const week = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]
    const weekOption = ["1", "2", "3", "4", "5", "6", "7"];

    const onFinish = (data) => {
        let payload: ScheduleNodePayload = {
            dayOfWeek: data.dayOfWeek,
            endDate: data.endDate,
            hour: data.hourAndMinute.hour(),
            minute: data.hourAndMinute.minutes(),
            startDate: data.startDate
        }
        onChange(payload);
    }
    return (
        <Form
            name="webhook"
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="開始時間"
                name="startDate"
                rules={[{ required: true, message: '請輸入開始時間' }]}
                initialValue={initialStartDate}
            >
                <DatePicker style={{ width: "100%" }} format="YYYY/MM/DD" />
            </Form.Item>

            <Form.Item
                label="結束時間"
                name="endDate"
                initialValue={initialEndDate}
            >
                <DatePicker style={{ width: "100%" }} format="YYYY/MM/DD" />
            </Form.Item>

            <Form.Item
                label="幾點幾分執行"
                rules={[{ required: true, message: '請輸入幾點幾分執行' }]}
                name="hourAndMinute"
                initialValue={initialTime}
            >
                <TimePicker style={{ width: "100%" }} format="HH:mm"></TimePicker>
            </Form.Item>

            <Form.Item
                label="在每個禮拜幾執行"
                name="dayOfWeek"
                initialValue={payload.dayOfWeek}
            >
                <CheckboxGroup options={weekOption} />
            </Form.Item>
            <Form.Item >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button danger onClick={onDelete}>刪除</Button>
                    <Button type="primary" htmlType="submit">
                        確定
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}

interface SchedulePreviewLayoutProps {
    payload: ScheduleNodePayload
}

export const SchedulePreviewLayout: React.FC<SchedulePreviewLayoutProps> = ({ payload }) => {
    const weekCheck: Array<boolean> = [false, false, false, false, false, false, false];
    const checkedWeekCompoents: Array<any> = []
    if (payload.dayOfWeek) {
        for (let i = 0; i < payload.dayOfWeek.length; i++) {
            if (payload.dayOfWeek[i]) {
                weekCheck[payload.dayOfWeek[i] - 1] = true;
            }
        }
        for (const check of weekCheck) {
            if (check) {
                checkedWeekCompoents.push(<CheckCircleTwoTone twoToneColor="#64dd17"></CheckCircleTwoTone>)
            } else {
                checkedWeekCompoents.push(<CloseCircleTwoTone twoToneColor="#e57373"></CloseCircleTwoTone>)
            }
        }
    }
    return (
        <div>
            {payload.startDate &&
                <div style={{ alignItems: "center", marginBottom: "0.5rem" }}>
                    <Badge style={{ marginRight: "0.5rem", background: "#ffd95b" }} count={"開始"}></Badge>
                    <span>{moment(payload.startDate).format("YYYY/MM/DD")}</span>
                </div>
            }
            {payload.endDate &&
                <div style={{ alignItems: "center", marginBottom: "0.5rem" }}>
                    <Badge style={{ marginRight: "0.5rem", background: "#4fc3f7" }} count={"結束"}></Badge>
                    <span>{moment(payload.endDate).format("YYYY/MM/DD")}</span>
                </div>
            }
            {payload.hour && payload.minute &&
                <div style={{ alignItems: "center", marginBottom: "1rem" }}>
                    <Badge style={{ marginRight: "0.5rem" }} count={"時間"}></Badge>
                    <span>{moment(`${payload.hour}:${payload.minute}`, 'h:mm a').format("h:mm a")}</span>
                </div>
            }
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "0.5rem" }}>
                {checkedWeekCompoents}
            </div>

        </div>
    );
}