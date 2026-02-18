import preview from '../../.storybook/preview'

import { Input } from '@/common/components'

const inputTypes = ['text', 'search', 'password', 'email'] as const

const meta = preview.meta({
  title: 'Example/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: inputTypes,
    },
    disabled: {
      control: 'boolean',
    },
    'aria-invalid': {
      control: 'boolean',
    },
  },
  args: {
    type: 'text',
    placeholder: 'Input',
    disabled: false,
    'aria-invalid': false,
  },
})

export const Playground = meta.story()

export const States = meta.story({
  render: (args) => (
    <div className="grid w-[320px] gap-4">
      <Input {...args} placeholder="Default" />
      <Input {...args} data-state="active" defaultValue="Active value" placeholder="Active" />
      <Input {...args} aria-invalid defaultValue="Error" placeholder="Error" />
      <Input {...args} disabled defaultValue="Disabled" placeholder="Disabled" />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
})

export const SearchDefault = meta.story({
  args: {
    type: 'search',
    placeholder: 'Input search',
  },
})

export const SearchActive = meta.story({
  args: {
    type: 'search',
    defaultValue: 'Rock playlist',
    placeholder: 'Input search',
  },
})

export const Password = meta.story({
  args: {
    type: 'password',
    defaultValue: 'qwerty123',
    placeholder: 'Input',
  },
})
