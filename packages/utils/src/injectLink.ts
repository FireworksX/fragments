interface InjectLinkOptions {
  rel: string
  href: string
}

export const injectLink = (options: InjectLinkOptions) => {
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link')

  Object.entries(options).forEach(([key, value]) => link.setAttribute(key, value))

  head.appendChild(link);
}