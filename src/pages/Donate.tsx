import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const donationTiers = [
	{
		name: 'Liked You So Much',
		price: '₹51',
		description: 'Small steps, stellar change!',
		details:
			'Your gesture keeps our cosmic light glowing—thank you for lifting us up 🚀',
		popular: false,
	},
	{
		name: 'Truly Loving Your Vibes',
		price: '₹201',
		description: 'Bright spark, brighter future!',
		details:
			'Your support fuels our orbit—helping us shine brighter for every user 🌟',
		popular: true,
	},
	{
		name: 'Can’t Live Without Us',
		price: '₹501',
		description: 'Guiding star, endless journey!',
		details:
			'Your belief powers our galaxy—together we reach new cosmic horizons 🙌',
		popular: false,
	},
];

const Donate = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const [customAmount, setCustomAmount] = React.useState('');
	const [customError, setCustomError] = React.useState('');
	const [isDonating, setIsDonating] = React.useState(false);

	const handleDonation = async (tierName: string, price: string | number) => {
		setIsDonating(true);
		try {
			console.log('Starting donation process for:', tierName);

			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) {
				toast({
					title: 'Authentication Required',
					description: 'Please log in to make a donation',
					variant: 'destructive',
				});
				return;
			}

			console.log('User authenticated, creating donation order...');

			// Create Razorpay order for donation
			const { data, error } = await supabase.functions.invoke(
				'create-razorpay-order',
				{
					body: {
						plan_name: `${tierName} Donation`,
						amount: parseInt(price.toString().replace('₹', '')) * 100, // Convert to paise
						message_credits: 0, // No credits for donations
					},
				}
			);

			if (error) {
				console.error('Order creation error:', error);
				throw new Error(error.message);
			}

			if (!data || !data.orderId) {
				console.error('Invalid order response:', data);
				throw new Error('Failed to create order');
			}

			console.log('Order created successfully:', data.orderId);

			// Initialize Razorpay payment
			const options = {
				key: data.keyId,
				amount: data.amount,
				currency: data.currency,
				name: 'KundliLabs',
				description: `${tierName} - Thank you for your support!`,
				order_id: data.orderId,
				handler: async function (response: any) {
					try {
						console.log('Payment completed, verifying...', response);

						// Verify payment
						const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
							'verify-razorpay-payment',
							{
								body: {
									razorpay_order_id: response.razorpay_order_id,
									razorpay_payment_id: response.razorpay_payment_id,
									razorpay_signature: response.razorpay_signature,
								},
							}
						);

						if (verifyError) {
							console.error('Payment verification error:', verifyError);
							throw new Error(verifyError.message);
						}

						console.log('Payment verified successfully:', verifyData);

						toast({
							title: 'Donation Successful! 💖',
							description:
								'Thank you for your generous support! Your kindness helps us grow 🌟',
						});

						// Redirect to donation success page with payment ID and amount
						setTimeout(() => {
							navigate(`/donation-success?payment_id=${response.razorpay_payment_id}&amount=${
								typeof price === 'string'
									? price.replace('₹', '')
									: price
							}`);
						}, 2000);
					} catch (err) {
						console.error('Payment verification failed:', err);
						toast({
							title: 'Donation Verification Failed',
							description:
								'Please contact support if payment was deducted. Error: ' +
								(err instanceof Error ? err.message : 'Unknown error'),
							variant: 'destructive',
						});
					}
				},
				prefill: {
					email: user.email,
					contact: user.user_metadata?.phone || '',
				},
				theme: {
					color: '#7c3aed',
				},
				modal: {
					ondismiss: function () {
						console.log('Payment modal dismissed');
					},
				},
			};

			console.log('Initializing Razorpay with options:', options);

			// Check if Razorpay is loaded
			if (!(window as any).Razorpay) {
				throw new Error(
					'Razorpay SDK not loaded. Please refresh the page and try again.'
				);
			}

			const rzp = new (window as any).Razorpay(options);

			rzp.on('payment.failed', function (response: any) {
				console.error('Payment failed:', response);
				toast({
					title: 'Donation Failed',
					description:
						response.error.description || 'Donation failed. Please try again.',
					variant: 'destructive',
				});

				setTimeout(() => {
					navigate('/donation-failed');
				}, 2000);
			});

			rzp.open();
		} catch (error) {
			console.error('Payment initialization error:', error);
			toast({
				title: 'Error',
				description:
					'Failed to initiate donation: ' +
					(error instanceof Error ? error.message : 'Unknown error'),
				variant: 'destructive',
			});
			setTimeout(() => {
				navigate('/payment-fallback');
			}, 2000);
		} finally {
			setIsDonating(false);
		}
	};

	// Custom amount validation
	const validateCustomAmount = (value: string) => {
		if (!value) return 'Please enter an amount';
		const num = Number(value);
		if (isNaN(num)) return 'Amount must be a number';
		if (num < 1) return 'Minimum donation is ₹1';
		if (num > 50000) return 'Maximum donation is ₹50,000';
		return '';
	};

	const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.replace(/[^0-9]/g, '');
		setCustomAmount(val);
		setCustomError(validateCustomAmount(val));
	};

	const handleCustomDonate = () => {
		const error = validateCustomAmount(customAmount);
		setCustomError(error);
		if (!error) {
			handleDonation('Custom Vibes', Number(customAmount));
		}
	};

	return (
		<div className="min-h-screen" style={{ backgroundColor: '#000' }}>
			<div style={{ backgroundColor: '#000' }}>
				<Navigation />
			</div>
			<main
				className="pt-24 pb-12 px-4 sm:px-8"
				style={{ backgroundColor: '#000' }}
			>
				<div
					className="max-w-7xl mx-auto"
					style={{ backgroundColor: '#000' }}
				>
					<div className="text-center mb-16" style={{ backgroundColor: '#000' }}>
						<h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
							🪐 Support Our Journey
						</h1>
						<p className="text-lg text-white/70 max-w-4xl mx-auto mt-6">
							help us grow. Choose the vibe that matches how you feel 💫
						</p>
					</div>
					<div
						className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
						style={{ backgroundColor: '#000' }}
					>
						{donationTiers.map((tier, index) => (
							<Card
								key={tier.name}
								className={`glass-card relative flex flex-col justify-between ${
									tier.popular
										? 'border-cosmic-purple shadow-cosmic-glow'
										: ''
								}`}
							>
								{tier.popular && (
									<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
										<span className="bg-cosmic-purple text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
											Most Popular
										</span>
									</div>
								)}
								<CardHeader className="text-center">
									<CardTitle className="text-2xl font-bold text-white mb-2">
										💖 {tier.name}
									</CardTitle>
									<CardDescription className="text-white/70 mb-4">
										{tier.description}
									</CardDescription>
									<div className="mt-4">
										<span className="text-4xl font-bold gradient-text">
											{tier.price}
										</span>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-white/80 leading-relaxed">
										{tier.details}
									</p>
								</CardContent>
								<CardFooter className="pt-6">
									<Button
										className="w-full py-3 text-lg font-semibold"
										variant="default"
										disabled={isDonating}
										onClick={() => handleDonation(tier.name, tier.price)}
									>
										Donate {tier.price}
									</Button>
								</CardFooter>
							</Card>
						))}
						{/* Custom Amount Card */}
						<Card className="glass-card flex flex-col justify-between relative">
							<CardHeader className="text-center">
								<CardTitle className="text-2xl font-bold text-white mb-2">
									💖 Custom Vibes For You
								</CardTitle>
								<CardDescription className="text-white/70 mb-4">
									Choose your cosmic flow!
								</CardDescription>
								<div className="mt-4">
									<input
										type="text"
										inputMode="numeric"
										pattern="[0-9]*"
										className="w-full px-4 py-2 rounded-lg bg-white/10 text-2xl text-center text-white border border-cosmic-purple focus:outline-none focus:ring-2 focus:ring-cosmic-purple placeholder:text-white/40"
										placeholder="Enter amount (₹)"
										value={customAmount}
										onChange={handleCustomInput}
										maxLength={5}
									/>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-white/80 leading-relaxed mb-2">
									Your kindness shapes KundliLabs—crafting infinite celestial
									experiences 🌌
								</p>
								{customError && (
									<p className="text-red-400 text-sm mt-2 text-center min-h-[1.5em]">
										{customError}
									</p>
								)}
							</CardContent>
							<CardFooter className="pt-6">
								<Button
									className="w-full py-3 text-lg font-semibold"
									variant="default"
									disabled={!!customError || !customAmount || isDonating}
									onClick={handleCustomDonate}
								>
									Donate
									{customAmount ? ` ₹${customAmount}` : ''}
								</Button>
							</CardFooter>
						</Card>
					</div>
					<div className="text-center mt-12" style={{ backgroundColor: '#000' }}>
						<p className="text-white/60">
							✅ All donations are processed securely. Your generosity helps us
							improve and expand our cosmic offerings.
						</p>
					</div>
				</div>
			</main>
			<div style={{ backgroundColor: '#000' }}>
				<Footer />
			</div>
		</div>
	);
};

export default Donate;