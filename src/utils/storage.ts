import SecureLS from 'secure-ls'

/**
 * Secure LocalStorage.
 * @description https://varunmalhotra.xyz/secure-ls/
 */
export const secureStroge = new SecureLS({ encodingType: 'des', isCompression: false, encryptionSecret: 'i-love-ku-hwa' });