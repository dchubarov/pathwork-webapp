import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link, Stack, TextField, Typography} from "@mui/material";
import LinkBehavior from "@components/LinkBehavior";
import {LoadingButton} from "@mui/lab";

interface Props {
    onSubmit: (username: string, password: string) => void;
    progress?: boolean;
}

const LoginForm: React.FC<Props> = ({onSubmit, progress}) => {
    const [usernameInvalid, setUsernameInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const {t} = useTranslation();

    useEffect(() => {
        usernameRef.current && usernameRef.current.focus();
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter")
            handleLoginButtonClick();
    }

    const handleLoginButtonClick = () => {
        const username = usernameRef.current ? usernameRef.current.value.trim() : "";
        const password = passwordRef.current ? passwordRef.current.value : "";

        if (username === "" || password === "") {
            setUsernameInvalid(username === "");
            setPasswordInvalid(password === "");
        } else {
            onSubmit(username, password);
        }
    }

    return (
        <Stack spacing={2} p={2}>
            <Typography color="text.secondary" variant="subtitle2">
                {t("auth.prompt")}
            </Typography>

            <TextField id="username"
                       inputRef={usernameRef}
                       label={t("auth.username")}
                       onChange={() => setUsernameInvalid(false)}
                       onKeyDown={handleKeyDown}
                       error={usernameInvalid}
                       disabled={progress}
                       size="small"
                       variant="standard"
                       autoFocus
                       required/>

            <TextField id="password"
                       inputRef={passwordRef}
                       label={t("auth.password")}
                       onChange={() => setPasswordInvalid(false)}
                       onKeyDown={handleKeyDown}
                       error={passwordInvalid}
                       disabled={progress}
                       size="small"
                       variant="standard"
                       type="password"
                       autoComplete="current-password"
                       required/>

            <Link component={LinkBehavior} variant="body2" href="#">
                {t("auth.forgot")}
            </Link>

            <LoadingButton loading={progress} onClick={handleLoginButtonClick} color="success" variant="contained">
                {t("auth.login")}
            </LoadingButton>
        </Stack>
    );
}

export default LoginForm;
