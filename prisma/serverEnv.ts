import z from 'zod';


const serverEnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    TIHLDE_FAKE_TOKEN: z.string().optional()
});

const getServerEnv = () => {
    const envServer = serverEnvSchema.safeParse({
        NODE_ENV: process.env.MY_NODE_ENV,
        TIHLDE_FAKE_TOKEN: process.env.TIHLDE_FAKE_TOKEN
    });

    if (!envServer.success) throw new Error('Invalid server environment');

    return envServer.data;
};


export const IS_PRODUCTION = getServerEnv().NODE_ENV === 'production';
export const TIHLDE_FAKE_TOKEN = getServerEnv().TIHLDE_FAKE_TOKEN;