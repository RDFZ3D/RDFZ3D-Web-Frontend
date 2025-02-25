import {z} from "zod";

export const schema = z.object({
    username: z.string().min(3, '用户名至少需要3个字符').max(20, '用户名最多20个字符'),
    email: z.string().email('请输入有效的邮箱地址'),
    password: z.string().min(6, '密码至少需要6个字符'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"]
});
