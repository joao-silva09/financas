import { Box, useTheme, Typography, Stack } from "@mui/material";
import React, { useState } from "react";
import { themeTokens } from "../themes";
import { Sidebar, Menu, MenuItem, MenuItemProps } from "react-pro-sidebar";
import {
  AssignmentIndOutlined,
  AssignmentLateOutlined,
  AssignmentOutlined,
  AssignmentTurnedInOutlined,
  CalculateOutlined,
  Dashboard,
  HomeOutlined,
  LocalAtmOutlined,
  LogoutOutlined,
  Receipt,
  ReceiptOutlined,
  SavingsOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Logout } from "../store/slices/Auth.store";
import DialogLogout from "../components/DialogLogout";
import { useDispatch } from "react-redux";

type ItemProps = MenuItemProps & {
  title: string;
  to?: string | any;
  icon?: any;
  selected?: string;
  setSelected(selected: string): void;
  onClick?: any;
};

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  onClick,
}: ItemProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = themeTokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.primary[500] }}
      onClick={() => {
        setSelected(title);
        navigate(to);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default function AppSidebar() {
  const theme = useTheme();
  const colors = themeTokens(theme.palette.mode);
  const [selected, setSelected] = useState("Home");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpenDialogLogout, setIsOpenDialogLogout] = useState(false);
  const handleOpenDialogLogout = () =>
    setIsOpenDialogLogout(!isOpenDialogLogout);

  return (
    <Box>
      <Sidebar backgroundColor={colors.background.paper[500]}>
        <Menu
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Box>
            <Typography variant="h3" color={colors.primary[500]}>
              eWallet
            </Typography>
          </Box>
          <Stack>
            <Typography
              color={colors.primary[500]}
              sx={{ m: "15px 0 5px 20px" }}
              variant="subtitle1"
            >
              Menu
            </Typography>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<Dashboard />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contas"
              to="/contas"
              icon={<SavingsOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Operações"
              to="/operacoes"
              icon={<CalculateOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Dívidas Ativas"
              to="/dividas/ativas"
              icon={<LocalAtmOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Dívidas Pagas"
              to="/dividas/pagas"
              icon={<ReceiptOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Objetivos"
              to="/objetivos"
              icon={<AssignmentOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Objetivos Cumpridos"
              to="/objetivos/cumpridos"
              icon={<AssignmentTurnedInOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <MenuItem
              style={{ color: colors.red[500] }}
              onClick={() => {
                setSelected("Sair");
                handleOpenDialogLogout();
              }}
              icon={<LogoutOutlined />}
            >
              <Typography>Sair</Typography>
            </MenuItem>
          </Stack>
        </Menu>
      </Sidebar>
      <DialogLogout
        open={isOpenDialogLogout}
        onClose={handleOpenDialogLogout}
        onLogout={() => {
          dispatch(Logout());
          handleOpenDialogLogout();
          navigate("/login");
        }}
      />
    </Box>
  );
}
