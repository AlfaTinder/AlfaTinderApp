import { useForm } from "react-hook-form";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import api from "../api/axios";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await api.post("/auth/login", data); // ⚠️ путь зависит от backend
      console.log("Успешный вход:", response.data);

      // TODO: сохранить токен / перейти на главную страницу
    } catch (error: any) {
      console.error("Ошибка входа:", error.response?.data || error.message);
      alert("Неверные данные или ошибка сервера");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" gap={2} mt={10}>
        <Typography variant="h4" align="center">
          Вход в AlfaTinder
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            fullWidth
            {...register("email", {
              required: "Email обязателен",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Некорректный email",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />

          <TextField
            label="Пароль"
            type="password"
            fullWidth
            {...register("password", {
              required: "Пароль обязателен",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Войти
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
