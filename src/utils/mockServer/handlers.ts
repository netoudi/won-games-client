import { rest } from 'msw'

type LoginRegBody = {
  email: string
}

// onde vamos interceptar as chamadas
export const handlers = [
  rest.post<LoginRegBody>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
    (req, res, ctx) => {
      const { email } = req.body

      // quando der erro
      if (email === 'false@email.com') {
        return res(
          ctx.status(400),
          ctx.json({
            error: 'Bad Request',
            message: [
              {
                messages: [
                  {
                    message: 'This email does not exist',
                  },
                ],
              },
            ],
          }),
        )
      }

      // quando for sucesso
      return res(
        ctx.status(200),
        ctx.json({
          ok: true,
        }),
      )
    },
  ),
]
