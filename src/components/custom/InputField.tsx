import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface InputFieldProps extends React.ComponentProps<"input"> {
  readonly label: string;
  readonly name: string;
}

const InputField = ({ label, name, ...rest }: InputFieldProps) => {
  const form = useFormContext();

  if (!form) {
    throw new Error("InputField must be used within a FormProvider");
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder="Email" {...field} {...rest} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
