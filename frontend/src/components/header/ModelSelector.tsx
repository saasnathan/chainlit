import { useState } from 'react';

import { useChatInteract } from '@chainlit/react-client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const MODELS = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o mini' },
  { value: 'deepseek-chat', label: 'DeepSeek' },
  { value: 'claude-3-5-sonnet', label: 'Claude 3.5' }
];

const STORAGE_KEY = 'chainlit_llm_model';
const DEFAULT_MODEL = 'gpt-4o';

export function ModelSelector() {
  const { updateChatSettings } = useChatInteract();
  const [selected, setSelected] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) || DEFAULT_MODEL
  );

  const handleChange = (value: string) => {
    setSelected(value);
    localStorage.setItem(STORAGE_KEY, value);
    updateChatSettings({ llm_model: value });
  };

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger
        className="h-8 w-[130px] text-xs border-border bg-background text-muted-foreground hover:text-foreground transition-colors"
        id="model-selector"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {MODELS.map((m) => (
          <SelectItem key={m.value} value={m.value} className="text-xs">
            {m.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
