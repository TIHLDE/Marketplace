import z from 'zod';


const serverEnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
});

const getServerEnv = () => {
    const envServer = serverEnvSchema.safeParse({
        NODE_ENV: process.env.NODE_ENV
    });

    if (!envServer.success) throw new Error('Invalid server environment');

    return envServer.data;
};


export const IS_PRODUCTION = getServerEnv().NODE_ENV === 'production';