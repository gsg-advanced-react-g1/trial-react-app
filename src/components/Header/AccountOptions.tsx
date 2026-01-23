import { Avatar, Button, Menu, rem } from "@mantine/core";
import {
  IconUser,
  IconLogin,
  IconUserPlus,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { ModeToggleBtn } from "../../modules/Theme/Views/ModeToggleBtn";
import type { AccountOptionsProps } from "./types";

function AccountOptions({ className }: AccountOptionsProps) {
  return (
    <div
      className={`flex items-center gap-2 sm:gap-3 md:gap-5 ${className ?? ""}`}
    >
      <ModeToggleBtn />
      <div className="flex items-center gap-2 sm:gap-3">
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Avatar
              radius="xl"
              size="md"
              className="cursor-pointer"
              color="blue"
            >
              <IconUser style={{ width: rem(20), height: rem(20) }} />
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item
              leftSection={
                <IconLogin style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Login
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconUserPlus style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Register
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              leftSection={
                <IconSettings style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Settings
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={
                <IconLogout style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Button variant="outline" className="hidden sm:inline-flex" size="sm">
          Login
        </Button>
        <Button variant="filled" className="hidden lg:inline-flex" size="sm">
          Register
        </Button>
      </div>
    </div>
  );
}

export default AccountOptions;
