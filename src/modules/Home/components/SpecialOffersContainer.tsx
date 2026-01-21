import { Button, Text, ThemeIcon } from "@mantine/core";
import { IconBolt, IconChevronRight } from "@tabler/icons-react";

const SpecialOffersContainer = ({
    title,
    subtitle,
    children,
}: {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
}) => {

    return (
        <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
            <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                        <ThemeIcon radius="xl" size="lg" variant="light" color="red">
                            <IconBolt size={18} />
                        </ThemeIcon>

                        <div>
                            <Text fw={800} className="text-xl">
                                {title}
                            </Text>
                            <Text size="sm" c="dimmed">
                                {subtitle}
                            </Text>
                        </div>
                    </div>

                    <Button
                        radius="xl"
                        variant="subtle"
                        color="gray"
                        rightSection={<IconChevronRight size={16} />}
                        onClick={() => {
                            console.log("View all offers");
                        }}
                    >
                        View all
                    </Button>
                </div>

                <div className="mt-5">
                    {children}
                </div>
            </div>
        </section>
    );
}

export default SpecialOffersContainer;