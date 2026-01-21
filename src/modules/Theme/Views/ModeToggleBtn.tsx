import { ActionIcon, Menu, rem, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon, IconDeviceDesktop } from "@tabler/icons-react";

export function ModeToggleBtn() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <ActionIcon
          variant="outline"
          size="lg"
          radius="md"
          aria-label="Toggle theme"
        >
          {colorScheme === "dark" ? (
            <IconMoon style={{ width: rem(18), height: rem(18) }} />
          ) : (
            <IconSun style={{ width: rem(18), height: rem(18) }} />
          )}
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Theme</Menu.Label>
        <Menu.Item
          leftSection={<IconSun style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => setColorScheme("light")}
          color={colorScheme === "light" ? "blue" : undefined}
        >
          Light
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoon style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => setColorScheme("dark")}
          color={colorScheme === "dark" ? "blue" : undefined}
        >
          Dark
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconDeviceDesktop style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => setColorScheme("auto")}
          color={colorScheme === "auto" ? "blue" : undefined}
        >
          System
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
