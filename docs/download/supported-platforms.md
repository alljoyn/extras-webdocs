# Supported Platforms - 14.06 release

## Platforms

| Platform     | Core | Base Services | Platform Versions | Toolchain/IDE       |
|--------------|------|---------------|-------------------|---------------------|
| Windows      |  X   |               | Win7, Win8        | VS 2012             |
| Android      |  X   |      X        | GB, ICS, JB, KK   | Android SDK, NDK r9 |
| iOS 7        |  X   |      X        | iOS 7, iOS 7.1    | XCode 5.1           |
| OS X         |  X   |               | OS X 10.9         | XCode 5.1           |
| Linux Ubuntu |  X   |      X        | Ubuntu 12.4       |                     |
| Open WRT     |  X   |      X        | AA, BB            |                     |


## Language Bindings

The table below lists which language bindings are supported on which platforms
for Core and Base Services. 

| Platform     | C++   | C    | C# Unity | Java | Objective-C |
|--------------|-------|------|----------|------|-------------|
| Windows      | Core  | Core |   Core   | Core |             |
| Android      | Core, Base  | Core |   Core   | Core, Base  |             |
| iOS          | Core  |      |          |      |Core, Base |
| OS X         | Core  |      |          |      |             |
| Linux Ubuntu | Core, Base  | Core |          | Core, Base  |             |
| Open WRT     | Core, Base  | Core |          |      |             |

Notes:
* Sun Java 7 is required for Java bindings.
* Unity 4.x is required for Unity bindings.
