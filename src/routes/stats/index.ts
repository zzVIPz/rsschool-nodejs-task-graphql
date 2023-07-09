import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/prisma-calls-count',
    method: 'GET',
    async handler() {
      return { count: fastify.prismaCallsCount };
    },
  });
};

export default plugin;
