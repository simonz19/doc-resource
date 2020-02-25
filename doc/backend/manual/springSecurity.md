# Spring security

## How to indicate dependency

indicate dependency in `pom.xml` as below:

```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
```

## Core classes

- WebSecurityConfigurerAdapter
- SecurityContextHolder
- SecurityContext
- Authentication
  - AbstractAuthenticationToken
    - UsernamepasswordAuthenticationToken
- UserDetail
- UserDetailService
- AuthenticationManager
  - WebSecurityConfigurerAdapter.AuthenticationManagerDelegator
  - ProviderManager
- AuthenticationProvider
  - AnonymousAuthenticationProvider
- Filter
  - GenericFilterBean
    - OncePerRequestFilter
    - AbstractAuthenticationProcessingFilter
      - UsernamePasswordAuthenticationFilter
    - SecurityContextPersistenceFilter
    - SessionManagementFilter
- AuthenticationEntryPoint
- AccessDeniedHandler

## Core annotations

- EnableWebSecurity