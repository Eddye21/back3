export default {
    openapi: '3.0.0',
    info: {
        title: 'Users API',
        version: '1.0.0'
    },
    paths: {
        '/api/users': {
            get: {
                tags: ['Users'],
                summary: 'Get all users',
                responses: {
                    200: {
                        description: 'Success'
                    }
                }
            }
        },
        '/api/users/{uid}': {
            get: {
                tags: ['Users'],
                summary: 'Get user by id',
                parameters: [
                    {
                        name: 'uid',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    200: {
                        description: 'Success'
                    },
                    404: {
                        description: 'User not found'
                    }
                }
            },
            put: {
                tags: ['Users'],
                summary: 'Update user by id',
                parameters: [
                    {
                        name: 'uid',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { type: 'object' }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'User updated'
                    },
                    404: {
                        description: 'User not found'
                    }
                }
            },
            delete: {
                tags: ['Users'],
                summary: 'Delete user by id',
                parameters: [
                    {
                        name: 'uid',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    200: {
                        description: 'User deleted'
                    }
                }
            }
        }
    }
};


