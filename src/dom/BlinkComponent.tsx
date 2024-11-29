import '@dialectlabs/blinks/index.css';
// import { useActionSolanaWalletAdapter, useAction } from '@dialectlabs/blinks';

export const BlinkComponent = () => {
  const actionApiUrl = '/api/actions/donate';
  // const { adapter } = useActionSolanaWalletAdapter(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
  // const { action, isLoading } = useAction({url: actionApiUrl});
  
  // if (isLoading) return null; 

  // return <Blink action={action} adapter={adapter} />;
  return <div>BlinkComponent</div>;
} 