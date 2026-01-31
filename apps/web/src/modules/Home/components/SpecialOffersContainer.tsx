import { Text, ThemeIcon } from "@mantine/core";
import { IconBolt, IconChevronRight } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

const SpecialOffersContainer = ({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) => {

    return (
        <section className="mt-6 overflow-hidden rounded-2xl shadow-2xl">
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

                    <Link to="/products/special-products" className="flex items-center gap-2">
                        View all
                        <IconChevronRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5 mt-5">
                    {children}
                </div>
            </div>
        </section>
    );
}

export default SpecialOffersContainer;