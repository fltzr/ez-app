import Box from "@cloudscape-design/components/box";
import Link, type { LinkProps } from "@cloudscape-design/components/link";
import StatusIndicator, {
  type StatusIndicatorProps,
} from "@cloudscape-design/components/status-indicator";

type KeyValuePairProps =
  | {
      variant: "text";
      label: string;
      value: string;
    }
  | {
      variant: "status";
      label: string;
      value: string;
      statusType: StatusIndicatorProps["type"];
    }
  | {
      variant: "link";
      label: string;
      value: string;
      link: string;
    };

export const KeyValuePair = ({
  label,
  variant,
  value,
  status,
  href,
  ...linkProps
}: KeyValuePairProps) => {
  const renderValue = () => {
    switch (variant) {
      case "text": { 
        return <Box variant="span">{value}</Box>;
      }
      

      case "status": { 
        return <StatusIndicator type={status}>{value}</StatusIndicator>;
      }
      

      case "link": { 
        return <Link href={href}>{value}</Link>
      }
      

    }
  };
};
