interface SvgProps {
  fill: string;
  className?: string;
}

export function Upper({ fill, className }: SvgProps) {
  return (
    <path
      d="M11.0097 4.48493L8.60219 2.07743L7.13219 0.599932C6.50969 -0.0225683 5.49719 -0.0225683 4.87469 0.599932L0.989687 4.48493C0.479687 4.99493 0.847187 5.86493 1.55969 5.86493H5.76719H10.4397C11.1597 5.86493 11.5197 4.99493 11.0097 4.48493Z"
      fill={fill}
      className={className}
    />
  );
}
