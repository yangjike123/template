import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-components"
import { IAccountLogin } from "../../../../types/IAccount";
import { useEffect, useState } from "react";
import { requsetGet } from "../../../utils/request";
export default () => {
    const [codeImage, setCodeImage] = useState<string>('');
    function onSubmit(values: IAccountLogin) {
        console.log('values: ', values);
    }
    async function getCode() {
        const { data } = await requsetGet<{ data: string }>('user/code');
        setCodeImage(data.replace('<svg', "<svg style='border-radius: 6px;'"));
    }
    useEffect(() => {
        getCode();
    }, [])
    return (
        <LoginForm
            logo="https://github.githubassets.com/favicons/favicon.png"
            title="XXX管理平台"
            subTitle="全球最大的代码托管平台"
            onFinish={onSubmit}
        >
            <ProFormText>
                <ProFormText
                    name={'account'}
                    rules={[
                        { required: true, message: '请输入登录账号' },
                        { pattern: /^[\w]{10,11}$/, message: '密码格式错误' }
                    ]}
                    fieldProps={{
                        prefix: '账号：'
                    }}
                    placeholder={'请输入登录账号'}
                />
                <ProFormText.Password
                    name="password"
                    rules={[
                        { required: true, message: '请输入登录密码' },
                        { pattern: /^[\w]{6,12}$/, message: '密码格式错误' }
                    ]}
                    fieldProps={{
                        prefix: '密码：'
                    }}
                    placeholder={'请输入登录密码'}
                />
                <ProForm.Group size={8} >
                    <ProFormText
                        name="code"
                        rules={[{ required: true, message: '请输入验证码' }]}
                        placeholder={'请输入验证码'}
                        width={220}
                    >
                    </ProFormText>
                    <div onClick={getCode} dangerouslySetInnerHTML={{ __html: codeImage }}></div>
                </ProForm.Group>
            </ProFormText>
        </LoginForm>
    )
}
