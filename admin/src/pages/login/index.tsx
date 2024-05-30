import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-components"
import { IAccountLogin } from "../../../../types/IAccount";
import { useEffect, useState } from "react";
import { getCaptcha, login } from "../../api/login";
import { message } from "antd";
import { useNavigate } from 'react-router-dom';
export default () => {

    const [codeImage, setCodeImage] = useState<string>('');
    const onNav = useNavigate();
    async function onSubmit(values: IAccountLogin) {
        try {
            await login(values);
            message.success('登录成功');
            setTimeout(() => {
                onNav('/');
                location.reload();
            }, 1000);
        } catch (error) {
            getCode();
        }
    }
    async function getCode() {
        const { data } = await getCaptcha();
        setCodeImage(data.replace('<svg', "<svg style='border-radius: 6px;'"));
    }
    useEffect(() => {
        getCode();
    }, [])
    return (
        <LoginForm
            logo="https://github.githubassets.com/favicons/favicon.png"
            title="XXX管理平台"
            subTitle={"全球最大的代码托管平台"}
            onFinish={onSubmit}
        >
            <ProFormText>
                <ProFormText
                    name={'account'}
                    rules={[
                        { required: true, message: '请输入登录账号' },
                        { pattern: /^[\w]{10,11}$/, message: '账号格式错误' }
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
                    <div
                        onClick={getCode}
                        style={{ cursor: 'pointer' }}
                        dangerouslySetInnerHTML={{ __html: codeImage }}
                    ></div>
                </ProForm.Group>
            </ProFormText>
        </LoginForm>
    )
}
